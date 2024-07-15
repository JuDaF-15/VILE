import User from '../models/user.js'
import cloudinary from 'cloudinary'
import fs from 'fs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from "../middlewares/sendEmail.js"

const saltRounds = 10

const httpUser = {
    getUser: async (req, res) => {
        let data = []

        const user = await User.find().populate("paymaster").populate("supervisor").populate("regional").populate("institute")

        //const user = await User.find()

        for (let index = 0; index < user.length; index++) {
            if (req.query.user) {
                if (user[index].role.data == 'user') {
                    data.push(user[index])
                }
            }

            if (req.query.supervisor) {
                if (user[index].role.data == 'supervisor') {
                    data.push(user[index])
                }
            }

            if (req.query.paymaster) {
                if (user[index].role.data == 'paymaster') {
                    data.push(user[index])
                }
            }
        }

        if (data.length == 0 && user.length !== 0) {
            data = user
        }

        return res.status(200).json(data)
    },

    getUserParams: async (req, res) => {
        const user = await User.findOne({ _id: req.params.id }).populate('institute').populate('regional').populate('supervisor').populate('paymaster')

        return res.status(200).json(user)
    },

    postUser: async (req, res) => {

        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        });

        const data = {
            name: req.body.name, mail: req.body.mail, identification: req.body.identification,
            role: req.body.role, position: req.body.position, branch: req.body.branch, paymaster: req.body.paymaster, staffType: req.body.staffType
        }

        if (data.role.data == 'user' && data.staffType.index == 0) {
            data.contract = req.body.contract
            data.object = req.body.object
            data.supervisor = req.body.supervisor
            data.regional = req.body.regional
            data.institute = req.body.institute

            try {
                data.password = await bcrypt.hash(req.body.password, saltRounds)
            } catch (error) {
                console.log(error)
                return res.status(400).json({ msg: 'Error, Usuario no creado' })
            }
        } else {
            try {
                data.password = await bcrypt.hash(req.body.password, saltRounds)
            } catch (error) {
                console.log(error)
                return res.status(400).json({ msg: 'Error, Usuario no creado' })
            }
        }
        const user = new User(data)


        const buscarCedula = await User.findOne({ identification: req.body.identification });
        const buscarCorreo = await User.findOne({ mail: req.body.mail });
        /* const buscarNumContrato = await User.findOne({ 
            'staffType.data': 'contractor',
            'contract.number': req.body.contract.number  // Aquí especificas la condición adicional para el rol
        }); */

        if (buscarCorreo) {
            return res
                .status(400)
                .json({ msg: "Ya existe un usuario con ese correo", buscarCorreo });
        } else if (buscarCedula) {
            return res
                .status(400)
                .json({ msg: "Ya existe un usuario con esa cédula", buscarCedula });
        } /* else if (buscarNumContrato) {
            return res
                .status(400)
                .json({ msg: "Ya existe un contratista con ese número de contrato", buscarNumContrato });
        } */ else {

            await user.save()

            const link = 'https://vile-cat.onrender.com'

            let mailOptions = {
                from: 'vilecat270@gmail.com',
                to: user.mail,
                subject: 'Bienvenido a VILE',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; font-weight:bold;color: #333">BIENVENIDO(A) A VILE</p>
                    <img src="cid:bienvenida" alt="Bienvenida" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; font-weight:bold;color: #333">Hola ${user.name},</p>
                    <p style="font-size: 16px; color: #333;">Ha sido registrado(a) en la plataforma VILE (Viajes y Legalizaciones) del Centro Agroturístico con el rol de <strong>${user}. Estas son sus
                    credenciales de acceso:</p>
                    <p style="font-size:16px;color: #333;"><strong>No. de documento: </strong>${user.identification}</p>
                    <p style="font-size:16px;color: #333;"><strong>Contraseña: </strong>${req.body.password}</strong></p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a>
                    <p style="font-size: 16px; color: #333; font-weight:bold">POR SU SEGURIDAD, NO COMPARTA ESTA INFORMACIÓN CON NADIE</p>
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'bienvenido.png',
                    path: './images/bienvenido.png',
                    cid: 'bienvenida'
                },
                {
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                }],
            };

            sendEmail.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo enviado a usuario creado');
                }
            });

            return res.status(200).json({ msg: 'Usuario creado' })
        }
    },

    putUser: async (req, res) => {
        const userId = req.params.id;

        try {
            const buscarCedula = await User.findOne({ identification: req.body.identification });
            const buscarCorreo = await User.findOne({ mail: req.body.mail });
            /* const buscarNumContrato = await User.findOne({
                $and: [
                    { 'staffType.data': 'contractor' },
                    { 'contract.number': req.body.contract.number },
                ]
            }); */

            if (buscarCorreo && buscarCorreo._id.toString() !== userId) {
                return res
                    .status(400)
                    .json({ msg: "Ya existe un usuario con ese correo", buscarCorreo });
            } else if (buscarCedula && buscarCedula._id.toString() !== userId) {
                return res
                    .status(400)
                    .json({ msg: "Ya existe un usuario con ese número de cédula", buscarCedula });
            } /* else if (buscarNumContrato && buscarNumContrato._id.toString() !== userId) {
                return res
                    .status(400)
                    .json({ msg: "Ya existe un contratista con ese número de contrato", buscarNumContrato });
            } */ else {

                Object.keys(req.body).forEach(key => {
                    if (typeof req.body[key] === 'string') {
                        req.body[key] = req.body[key].trim();
                    }
                });

                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $set: req.body,
                    },
                    { new: true }
                );

                res.status(200).json({
                    msg: "Usuario modificado exitosamente",
                    user: updatedUser,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error al editar usuario" });
        }

    },

    postUpload: async (req, res) => {
        if (!req.files) {

            return res.status(400).json({ msg: 'No se ha cargado ningún archivo' })
        }

        const file = req.files.file;


        if (!file) {
            return res.status(400).json({ msg: 'No se ha cargado ningún archivo' })
        }

        const nameFile = file.name;
        const extension = nameFile.split(".").pop();
        if (extension !== "xlsx" && extension !== "xls") {
            return res.status(400).json({ msg: 'El archivo no es valido' })
        }

        generateInfoOfExcel(file, req);

        fs.unlink(file.tempFilePath, function (err) {
            if (err) {
                console.log(err)
            }
        })

        res.send("loco")
    },

    putSign: async (req, res) => {
        const { id } = req.params

        const user = await User.findOne({ _id: id })

        const data = {}

        if (req.files) {
            const file = req.files.test

            if (user.sign && user.sign.url) {
                try {
                    await cloudinary.v2.uploader.destroy(
                        user.sign.public_id,
                        {
                            resource_type: 'image',
                            type: 'upload',
                            format: 'png'
                        }
                    )
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ msg: 'Error, Firma no modificada' })
                }
            }

            fs.exists('uploads', function (exists) {
                if (!exists) {
                    fs.mkdir('uploads', function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                }

                file.mv(`uploads/${file.name}`, async function (err) {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({ msg: 'Error, Firma no modificada' })
                    }

                    try {
                        const result = await cloudinary.v2.uploader.upload(
                            `uploads/${file.name}`,
                            {
                                public_id: 'firma',
                                folder: `/test/${user.mail}`,
                                // filename_override: 'firma',
                                // eager: 'h_260,w_260,c_limit'
                                transformation: [
                                    { height: 200, width: 280, crop: 'limit' },
                                    // {quality: 'auto'},
                                    // {fetch_format: 'auto'}
                                ],
                                format: "png"
                            }
                        )

                        data.sign = { url: result.secure_url, public_id: result.public_id }
                    } catch (error) {
                        console.log(error)
                        fs.unlink(`uploads/${file.name}`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        })

                        return res.status(400).json({ msg: 'Error, Firma no modificada' })
                    }

                    fs.unlink(`uploads/${file.name}`, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })

                    await User.findByIdAndUpdate(id, data)

                    return res.status(200).json({ msg: 'Firma modificada' })
                })
            })

        }
    },

    postLogin: async (req, res) => {
        const { identification, password } = req.body

        const user = await User.findOne({ identification: identification })

        if (!user) {
            return res.status(404).json({ msg: 'Credenciales inválidas' })
        } else if (user.status === 0) {
            return res.status(404).json({ msg: 'Usuario inactivo' })
        } else {
            await bcrypt.compare(password, user.password, async function (err, result) {
                if (result == true) {
                    await jwt.sign({ mail: user.mail, identification: user.identification, id: user._id, role: user.role, staffType: user.staffType }, process.env.PRIVATE_KEY, function (err, token) {
                        // console.log(token)
                        return res.status(200).json({ token: token })
                    })
                } else {
                    return res.status(400).json({ msg: 'Credenciales inválidas' })
                }
            })
        }
    },

    patchUser: async (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        try {
            const usuario = await User.findById(id);
            if (usuario) {
                usuario.status = status;
                await usuario.save();
                res.json(usuario);
            } else {
                res
                    .status(404)
                    .json({ mensaje: `usuario con id: ${id} no encontrado` });
            }
        } catch (error) {
            console.log(`Error al actualizar el usuario: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    envioEmail: async (req, res) => {
        try {

            const { mail } = req.body;

            if (typeof mail === 'string') {
                mail.trim();
            }

            const usuario = await User.findOne({ mail: mail })

            if (!usuario) {
                return res.status(404).json(`El correo proporcionado no se encuentra registrado`);
            }

            let msg = "Por favor consulte su correo electrónico (incluida su bandeja de spam / correo no deseado)";
            const token = jwt.sign({ id: usuario.id },
                process.env.PRIVATE_KEY_MAIL,
                { expiresIn: '20m' }
            );
            const link = `${process.env.CLIENT_URL}/#/nueva/contrasena?reset=${token}`;
            usuario.recuperacion = token;
            await usuario.save();
            try {
                await sendEmail.sendMail({
                    from: `<vilecat270@gmail.com>`,
                    to: usuario.mail,
                    subject: "Restablecimiento de contraseña",
                    html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; font-weight:bold;color: #333">RECUPERACIÓN DE CONTRASEÑA</p>
                    <img src="cid:restablecer" alt="Restablecer contraseña" style="display: block; margin: 0 auto; max-width: 20%; height: auto;">
                    <p style="font-size: 16px; font-weight:bold; color:#333">Hola ${usuario.name},</p>
                    <p style="font-size: 16px; color: #333;">Se ha recibido una solicitud para restablecer su contraseña. Por favor, haga clic en el botón para comenzar:</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">RESTABLECER CONTRASEÑA</a>
                    <p style="font-size: 16px; color: #333; font-weight:bold">SI NO SOLICITÓ ESTE SERVICIO, PUEDE IGNORAR ESTE CORREO.</p>
                    <span>*Tiene 15 minutos para restablecer la contraseña, pasado este tiempo deberá generar un nuevo enlace</span><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                    attachments: [{
                        filename: 'restablecer-la-contrasena.png',
                        path: './images/restablecer-la-contrasena.png',
                        cid: 'restablecer'
                    },
                    {
                        filename: 'logo-sena-blanco.png',
                        path: './images/logo-sena-blanco.png',
                        cid: 'logo_sena'
                    }]
                })
                console.log(link);
            } catch (error) {
                console.log('error al enviar correo de restablecimiento', error);
                return res.status(400).json({ msg: 'Ha ocurrido un error' })
            }
            return res.status(202).json({ msg, link, token })
        } catch (error) {
            console.log('ERROR 1', error);
            return res.status(500).json({ msg: 'Ha ocurrido un error' })
        }
    },

    nuevaContrasena: async (req, res) => {
        const { nuevaContrasena } = req.body;
        const recuperacion = req.headers.reset;
        if (!recuperacion || !nuevaContrasena) {
            return res.status(404).json({ msg: "Campos requerido o invalidos" });
        }
        try {
            const usuario = await User.findOne({ recuperacion: recuperacion });
            if (!usuario) {
                return res.status(404).json({ msg: 'Token inválido' })
            };

            const jtoken = jwt.verify(recuperacion, process.env.PRIVATE_KEY_MAIL);
            console.log(jtoken);
            if (!jtoken) {
                return res.status(400).json({ msg: 'Token inválido' })
            }

            if (typeof nuevaContrasena !== 'string') {
                return res.status(400).json({ msg: 'La nueva contraseña no es valida' })
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(nuevaContrasena, salt);
            usuario.password = hashedPassword
            usuario.recuperacion = null;
            await usuario.save();

            return res.status(200).json({ msg: 'Contraseña restablecida con éxito', nuevaContrasena })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ msg: 'Token de restablecimiento expirado' })
        }
    }

}

export {
    httpUser
}