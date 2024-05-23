import User from '../models/user.js'
import cloudinary from 'cloudinary'
import fs from 'fs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as XLSX from "xlsx/xlsx.mjs";
import sendEmail from "../middlewares/sendEmail.js"
import user from '../models/user.js'

const saltRounds = 8

console.log(XLSX)

XLSX.set_fs(fs)

function generateInfoOfExcel(file, req) {
    console.log(file)

    const excelFile = XLSX.readFile(file.tempFilePath);
    const sheetName = excelFile.SheetNames;

    const sheet = excelFile.Sheets[sheetName[0]];
    //hacer que el json tenga un array de objetos, cada uno con la propiedad number, month, letter

    const data = XLSX.utils.sheet_to_json(sheet, {
        header: [, "name", "document", "ncontract", "datecontract", "object", , , "area", , "email", , , , , , , , , , "supervisor", "sdocument", , "emailsuper", "cargo", , , , , , , , , , "datefinish"],
        range: 1, //para que empiece a leer desde la fila 2
        row: false, //para que los datos los tome como columnas
        blankrows: false, //para no incluir las filas en blanco
        defval: null, //para que los datos vacíos los tome como null
        cellDates: true, //para que las fechas las tome como fechas
        sheetStubs: true, //para que las celdas vacías las tome como null
    });

    console.log(data)


};

const httpUser = {
    getUser: async (req, res) => {
        let data = []

        const user = await User.find()

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
                data.password = await bcrypt.hash(req.body.identification.number, saltRounds)
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

        await user.save()

        let mailOptions = {
            from: 'repositoriosena123@gmail.com',
            to: user.mail,
            subject: 'Bienvenido a VILE',
            text: `Hola ${user.name},\n\nHas sido registrado en nuestra plataforma. Aquí están tus credenciales:\n\nNo. de Identificación: ${user.identification}\nContraseña: ${req.body.password}\n\nPor favor, no compartas esta información con nadie.\n\nSaludos,\nEl equipo de Nuestra Plataforma`
        };

        sendEmail.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado');
            }
        });

        return res.status(200).json({ msg: 'Usuario creado' })
    },

    putUser: async (req, res) => {
        const userId = req.params.id
        const data = {
            name: req.body.name,
            mail: req.body.mail,
            identification: req.body.identification,
            role: req.body.role,
            position: req.body.position,
            branch: req.body.branch,
            paymaster: req.body.paymaster,
            staffType: req.body.staffType
        }

        /* if (data.role.data == 'user' && data.staffType.index == 0) {
            data.contract = req.body.contract
            data.object = req.body.object
            data.supervisor = req.body.supervisor
            data.regional = req.body.regional
            data.institute = req.body.institute
        } */

        // Encuentra el usuario por ID y actualiza los datos, excluyendo la contraseña
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $set: data
                },
                { new: true }
            );

            res.status(200).json({ msg: 'Usuario actualizada exitosamente', user: updatedUser });

        } catch (error) {
            console.log(error);
            res.status(502).json({ msg: 'ha ocurrido un error al momento de hacer el cambio' });
            return error
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
                            type: 'upload'
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
                                ]
                                // format: "jpg"
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
        } else {
            await bcrypt.compare(password, user.password, async function (err, result) {
                if (result == true) {
                    await jwt.sign({ mail: user.mail, identification: user.identification, id: user._id, role: user.role }, process.env.PRIVATE_KEY, function (err, token) {
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
            const usuario = await User.findOne({ mail: mail })

            if (!usuario) {
                return res.status(404).json(`El correo proporcionado no se encuentra registrado`);
            }

            let msg = "Por favor consulte su correo electrónico (incluida su bandeja de spam)";
            let link;
            const token = jwt.sign({ id: usuario.id },
                process.env.PRIVATE_KEY_MAIL,
                { expiresIn: '15m' }
            );
            link = `${process.env.CLIENT_URL}#/nueva/contrasena?reset=${token}`;
            usuario.recuperacion = token;
            await usuario.save();
            try {
                await sendEmail.sendMail({
                    from: `<repositoriosena123@gmail.com>`,
                    to: usuario.mail,
                    subject: "Recuperación de contraseña",
                    html: `<div>
  <b>Estimado usuario, haga click en el siguente enlace para comenzar la recuperación de su contraseña:</b><br>
  <a href="${link}">${link}</a>
  <h3>SI NO SOLICITÓ ESTE SERVICIO, POR FAVOR HACER CASO OMISO A ESTE CORREO</h>

  </div>`
                })
                console.log(link);
            } catch (error) {
                console.log('error', error);
                return res.status(400).json({ msg: 'Ha ocurrido un error' })
            }
            return res.status(202).json({ msg, link })
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
                return res.status(404).json({ msg: 'Token Invalido' })
            };

            const jtoken = jwt.verify(recuperacion, process.env.PRIVATE_KEY_MAIL);
            console.log(jtoken);
            if (!jtoken) {
                return res.status(400).json({ msg: 'Token invalido' })
            }

            if (typeof nuevaContrasena !== 'string') {
                return res.status(400).json({ msg: 'La nueva contraseña no es valida' })
            }

            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(nuevaContrasena, salt);
            usuario.password = hashedPassword
            usuario.recuperacion = '';
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