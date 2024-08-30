import Schedule from '../models/schedule.js'

import User from '../models/user.js'

import cloudinary from 'cloudinary'

import sendEmail from "../middlewares/sendEmail.js"

import fs from 'fs'

const httpSchedule = {

    postSchedule: async (req, res) => {

        const schedule = new Schedule(req.body)

        try {

            const existingSchedule = await Schedule.findOne({
                userId: req.body.userId,
                $or: [
                    { tripStart: { $gte: req.body.tripStart, $lte: req.body.tripEnd }, tripEnd: { $gte: req.body.tripEnd, $lte: req.body.tripEnd } }
                ],
            })

            if (existingSchedule) {
                return res.status(400).json({ msg: 'Usted ya tiene una agenda con exactamente las mismas fechas' });
            }

            await schedule.save()

            // Obtener el usuario que creó la agenda
            const user = await User.findById(req.body.userId).populate('supervisor').populate('paymaster');

            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            const link = process.env.CLIENT_URL

            // CONTRATISTA CREA AGENDA
            if (user.role.data === "user" && user.staffType.data === "contractor") {
                // Obtener el correo del supervisor

                const supervisorEmail = user.supervisor.mail;

                let mailOptions = {
                    from: process.env.MAIL_ADDRESS,
                    to: supervisorEmail,
                    subject: 'Creación de agenda',
                    html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">NUEVA AGENDA CREADA</p>
                    <img src="cid:nuevo" alt="Nueva Agenda" style="display: block; margin: 0 auto; max-width: 20%; height: auto;">
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${user.supervisor.name},</p>
                    <p style="font-size: 16px; color: #333;">El contratista <strong>${user.name}</strong> ha creado una nueva agenda. Por favor, revísela para aprobarla o rechazarla.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                    attachments: [
                        {
                            filename: 'nuevo.png',
                            path: './images/nuevo.png',
                            cid: 'nuevo'
                        },
                        {
                            filename: 'logo-sena-blanco.png',
                            path: './images/logo-sena-blanco.png',
                            cid: 'logo_sena'
                        }
                    ]
                }
                sendEmail.sendMail(mailOptions, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo de creación de agenda enviado a supervisor');
                    }
                });
            } else if (user.role.data === "user" && user.staffType.data === "publicWorker") {
                // FUNCIONARIO CREA AGENDA

                // Obtener el correo del ordenador

                const paymasterEmail = user.paymaster.mail;

                let mailOptions = {
                    from: process.env.MAIL_ADDRESS,
                    to: paymasterEmail,
                    subject: 'Creación de agenda',
                    html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">NUEVA AGENDA CREADA</p>
                    <img src="cid:nuevo" alt="Nueva Agenda" style="display: block; margin: 0 auto; max-width: 20%; height: auto;">
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${user.paymaster.name},</p>
                    <p style="font-size: 16px; color: #333;">El funcionario <strong>${user.name}</strong> ha creado una nueva agenda. Por favor, revísala para aprobarla o rechazarla.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                    attachments: [
                        {
                            filename: 'nuevo.png',
                            path: './images/nuevo.png',
                            cid: 'nuevo'
                        },
                        {
                            filename: 'logo-sena-blanco.png',
                            path: './images/logo-sena-blanco.png',
                            cid: 'logo_sena'
                        }
                    ]

                };
                sendEmail.sendMail(mailOptions, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo de creacion de agenda funcionario enviado');
                    }
                });
            } else if (user.role.data = "supervisor") {
                const paymasterEmail = user.paymaster.mail;

                let mailOptions = {
                    from: process.env.MAIL_ADDRESS,
                    to: paymasterEmail,
                    subject: 'Creación de agenda',
                    html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">NUEVA AGENDA CREADA</p>
                    <img src="cid:nuevo" alt="Nueva Agenda" style="display: block; margin: 0 auto; max-width: 20%; height: auto;">
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${user.paymaster.name},</p>
                    <p style="font-size: 16px; color: #333;">El supervisor de contrato <strong>${user.name}</strong> ha creado una nueva agenda. Por favor, revísala para aprobarla o rechazarla.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                    attachments: [
                        {
                            filename: 'nuevo.png',
                            path: './images/nuevo.png',
                            cid: 'nuevo'
                        },
                        {
                            filename: 'logo-sena-blanco.png',
                            path: './images/logo-sena-blanco.png',
                            cid: 'logo_sena'
                        }
                    ]
                };
                sendEmail.sendMail(mailOptions, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo de creacion de agenda supervisor enviado');
                    }
                });
            }

            return res.status(200).json({ msg: 'Agenda creada' })
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Error al crear la agenda" });
        }

    },

    getSchedule: async (req, res) => {
        const schedule = await Schedule.find()

        const data = []

        if (req.query.supervisor) {
            const { supervisor } = req.query

            for (let index = 0; index < schedule.length; index++) {
                if (req.query.historical) {
                    if (schedule[index].supervisor.id == supervisor && schedule[index].status.index !== 1 && schedule[index].status.index !== null) {
                        data.push(schedule[index])
                    }
                } else if (req.query.legalization) {
                    if (schedule[index].supervisor.id = supervisor && schedule[index].status.index == 5) {
                        data.push(schedule[index])
                    }
                } else {
                    if (schedule[index].supervisor.id == supervisor && schedule[index].status.index == 1) {
                        data.push(schedule[index])
                    }
                }
            }
        } else if (req.query.paymaster) {
            const { paymaster } = req.query

            for (let index = 0; index < schedule.length; index++) {
                if (schedule[index].paymaster.id == paymaster && schedule[index].status.index == 2) {
                    data.push(schedule[index])
                }
            }
        } else {
            if (req.query.legalization) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == 6) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == 3) {
                        data.push(schedule[index])
                    }
                }
            }
        }

        return res.status(200).json(data)
    },

    getScheduleParams: async (req, res) => {
        const { id } = req.params

        const data = []

        if (req.query.contractor) {
            const schedule = await Schedule.find({ contractor: id })

            if (req.query.historical) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index !== null) {
                        data.push(schedule[index])
                    }
                }
            } else if (req.query.legalization) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == 4) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == null || schedule[index].status.index == 0) {
                        data.push(schedule[index])
                    }
                }
            }
        }

        if (req.query.publicWorker) {
            const schedule = await Schedule.find({ publicWorker: id })

            if (req.query.legalization) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == 4) {
                        data.push(schedule[index])
                    }
                }
            } else if (req.query.historical) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status !== null) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == null || schedule[index].status.index == 0) {
                        data.push(schedule[index])
                    }
                }
            }
        }

        if (req.query.supervisor) {
            const schedule = await Schedule.find({ supervisor_id: id })

            if (req.query.legalization) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == 4) {
                        data.push(schedule[index])
                    }
                }
            } else if (req.query.historical) {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index !== null) {
                        data.push(schedule[index])
                    }
                }
            } else {
                for (let index = 0; index < schedule.length; index++) {
                    if (schedule[index].status.index == 0 || schedule[index].status.index == null) {
                        data.push(schedule[index])
                    }
                }
            }

        }

        return res.status(200).json(data)
    },

    putSchedule: async (req, res) => {
        const { id } = req.params

        // Se envia el nuevo estado de la agenda en req.body.status
        const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });

        // Obtener el usuario que creó la agenda
        const creator = await User.findOne({ mail: schedule.contract.mail }).populate('paymaster').populate('supervisor');

        /* if (!creator || !paymaster) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        } */

        const link = process.env.CLIENT_URL

        if (req.body.status.data === "Agenda rechazada") {
            // Obtener el usuario que modificó la agenda
            const modUser = await User.findById(req.body.userId)

            if (modUser.role.data === "supervisor") {
                // SUPERVISOR RECHAZA AGENDA

                let SupervisorMailOptions = {
                    from: process.env.MAIL_ADDRESS,
                    to: creator.mail,
                    subject: 'Agenda Rechazada',
                    html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                         <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                         <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                         <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                         </div><br />
                         <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA RECHAZADA</p>
                         <img src="cid:rechazar" alt="Rechazar" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                         <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.name},</p>
                         <p style="font-size: 16px; color: #333;">Su supervisor de contrato <strong>${modUser.name}</strong> ha rechazado su agenda con la siguiente justificacion: <strong>${schedule.status.justification}</strong></p>
                         <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                         <span>*Este correo es generado automáticamente, por favor no responder</span>
                     </div>
                     `,
                    attachments: [{
                        filename: 'logo-sena-blanco.png',
                        path: './images/logo-sena-blanco.png',
                        cid: 'logo_sena'
                    },
                    {
                        filename: 'rechazar.png',
                        path: './images/rechazar.png',
                        cid: 'rechazar'
                    }]
                }
                sendEmail.sendMail(SupervisorMailOptions, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo enviado a contratista');
                    }
                });

            } else if (modUser.role.data === "paymaster") {
                // ORDENADOR RECHAZA AGENDA
                let paymasterMailOptions = {
                    from: process.env.MAIL_ADDRESS,
                    to: creator.mail,
                    subject: 'Agenda Rechazada',
                    html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                        <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                        <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                        <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                        </div><br />
                        <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA RECHAZADA</p>
                        <img src="cid:rechazar" alt="Rechazar" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                        <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.name},</p>
                        <p style="font-size: 16px; color: #333;">El ordenador del gasto <strong>${modUser.name}</strong> ha rechazado su agenda creada con la siguiente justificacion: <strong>${schedule.status.justification}</strong></p>
                        <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                        <span>*Este correo es generado automáticamente, por favor no responder</span>
                    </div>
                    `,
                    attachments: [{
                        filename: 'logo-sena-blanco.png',
                        path: './images/logo-sena-blanco.png',
                        cid: 'logo_sena'
                    },
                    {
                        filename: 'rechazar.png',
                        path: './images/rechazar.png',
                        cid: 'rechazar'
                    }]
                }
                sendEmail.sendMail(paymasterMailOptions, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo de rechazo de ordenador enviado');
                    }
                });
            }

        } else if (req.body.status.data === 'Agenda firmada por Contratista') {
            // CUANDO EL CONTRATISTA MODIFICA AGENDA, NOTIFICAR AL SUPERVISOR

            // NOTIFICAR AL SUPERVISOR
            let creatorMailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.supervisor.mail,
                subject: 'Agenda Modificada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA MODIFICADA</p>
                    <img src="cid:editar" alt="Editada" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.supervisor.name},</p>
                    <p style="font-size: 16px; color: #333;">El contratista <strong>${creator.name}</strong> ha modificado una agenda creada. Queda pendiente por su aprobación
                    o rechazo.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'editar.png',
                    path: './images/editar.png',
                    cid: 'editar'
                }]
            };

            sendEmail.sendMail(creatorMailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo al supervisor:', error);
                } else {
                    console.log('Correo al supervisor enviado correctamente');
                }
            });


        } else if (req.body.status.data === 'Agenda firmada por Funcionario') {
            // CUANDO EL FUNCIONARIO MODIFICA AGENDA, NOTIFICAR AL ORDENADOR

            // NOTIFICAR AL ORDENADOR
            let creatorMailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.paymaster.mail,
                subject: 'Agenda Modificada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA MODIFICADA</p>
                    <img src="cid:editar" alt="Editada" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.paymaster.name},</p>
                    <p style="font-size: 16px; color: #333;">El funcionario <strong>${creator.name}</strong> ha modificado una agenda creada. Queda pendiente por su aprobación
                    o rechazo.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'editar.png',
                    path: './images/editar.png',
                    cid: 'editar'
                }]
            };

            sendEmail.sendMail(creatorMailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo al supervisor:', error);
                } else {
                    console.log('Correo al ordenador enviado correctamente');
                }
            });


        } else if (req.body.status.data === "Agenda firmada por Supervisor") {

            // CUANDO EL SUPERVISOR FIRMA AGENDA, NOTIFICAR AL CONTRATISTA Y ORDENADOR

            // Obtener el supervisor que modificó la agenda
            const supervisor = await User.findById(req.body.userId)

            // NOTIFICAR AL CONTRATISTA
            let creatorMailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.mail,
                subject: 'Agenda Aprobada y Firmada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA FIRMADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.name},</p>
                    <p style="font-size: 16px; color: #333;">Su supervisor de contrato <strong>${supervisor.name}</strong> ha aprobado su agenda creada. Queda pendiente por aprobación del
                    ordenador del gasto</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]
            };

            // NOTIFICAR AL ORDENADOR
            let paymasterMailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.paymaster.mail,
                subject: 'Agenda Aprobada y Firmada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA FIRMADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.paymaster.name},</p>
                    <p style="font-size: 16px; color: #333;">El supervisor de contrato <strong>${supervisor.name}</strong> del contratista <strong>${creator.name}</strong> ha aprobado la agenda creada. Queda pendiente por su
                    aprobación o rechazo</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]
            }

            // Envío de correos
            sendEmail.sendMail(creatorMailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo al creador:', error);
                } else {
                    console.log('Correo al creador enviado correctamente');
                }
            });

            sendEmail.sendMail(paymasterMailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo al ordenador:', error);
                } else {
                    console.log('Correo al ordenador enviado correctamente');
                }
            });
        } else if (req.body.status.data === "Agenda firmada por Ordenador") {

            // Obtener el paymaster que modificó la agenda
            const paymaster = await User.findById(req.body.userId)

            // NOTIFICAR AL CREADOR
            let mailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.mail,
                subject: 'Agenda Aprobada y Firmada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA FIRMADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.name},</p>
                    <p style="font-size: 16px; color: #333;">El ordenador del gasto <strong>${paymaster.name}</strong> ha aprobado su agenda creada. Queda pendiente por 
                    la creación de legalización por parte del Administrador</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]

            };

            // NOTIFICA AL ADMIN

            // obtener el admin
            const adminUser = await User.findOne({ 'role.data': 'administrator' });

            let adminMailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: adminUser.mail,
                subject: 'Agenda Aprobada y Firmada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">AGENDA FIRMADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola administrador ${adminUser.name},</p>
                    <p style="font-size: 16px; color: #333;">El ordenador del gasto <strong>${paymaster.name}</strong> ha firmado la agenda de <strong>${creator.name}</strong>. Queda pendiente por 
                    la creación de la legalización</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]

            };

            sendEmail.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo del ordenador aprobado...', error);
                } else {
                    console.log('Correo del ordenador enviado correctamente');
                }
            });

            sendEmail.sendMail(adminMailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo al admin...', error);
                } else {
                    console.log('Correo del ordenador al admin enviado correctamente');
                }
            });

        } else if (req.body.status.data === 'Agenda en Proceso de Legalización') {
            // Obtener el admin que modificó la agenda
            const admin = await User.findById(req.body.userId)

            // NOTIFICAR AL CREADOR

            let mailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.mail,
                subject: 'Proceso de Legalización',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">LEGALIZACIÓN CREADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.name},</p>
                    <p style="font-size: 16px; color: #333;"><strong>${admin.name}</strong> ha creado la legalización de su agenda con
                    número de orden de viaje <strong>${schedule.tripOrder}</strong>. Queda pendiente por que usted agregue las evidencias y/o soportes y conclusiones y que la firme</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]

            };

            sendEmail.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo de legalización...', error);
                } else {
                    console.log('Correo de legalización enviado correctamente');
                }
            });

        }

        return res.status(200).json({ msg: 'Agenda modificada' })
    },

    postLegalizacion: async (req, res) => {
        const { id } = req.params

        console.log(req.files)

        const schedule = await Schedule.findOne({ _id: id })

        if (schedule.collections && schedule.collections.length !== 0) {
            for (let index = 0; index < schedule.collections.length; index++) {
                for (let mainIndex = 0; mainIndex < schedule.collections[index].items.length; mainIndex++) {
                    if (schedule.collections[index].items[mainIndex].public_id) {
                        try {
                            await cloudinary.v2.uploader.destroy(
                                schedule.collections[index].items[mainIndex].public_id,
                                {
                                    resource_type: 'image',
                                    type: 'upload'
                                }
                            )

                            // await cloudinary.v2.api.delete_folder(`test/img/${id}/${index}${mainIndex}`, {}, function(err, result) {
                            //     if(err) {
                            //         console.log(err)
                            //     }

                            // console.log(`${index}${mainIndex}`)

                            // })
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
        }

        const data = []

        if (!req.files || Object.keys(req.files).length == 0) {
            return res.status(400).json({ msg: 'Error, Archivos no encontrados' })
        }

        fs.exists('uploads', function (exists) {
            if (!exists) {
                fs.mkdir('uploads', function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
            }
        })

        const keys = Object.keys(req.files)

        for (let index = 0; index < keys.length; index++) {
            // console.log(req.files[keys[index]])

            fs.exists(`uploads/${keys[index]}`, function (exists) {
                if (!exists) {
                    fs.mkdir(`uploads/${keys[index]}`, function (error) {
                        if (error) {
                            console.log(error)
                        }
                    })
                }


                req.files[keys[index]].mv(`uploads/${keys[index]}/${req.files[keys[index]].name}`, async function (err) {
                    if (err) {
                        console.log(err)
                    }

                    try {
                        const result = await cloudinary.v2.uploader.upload(
                            `uploads/${keys[index]}/${req.files[keys[index]].name}`,
                            {
                                public_id: 'file',
                                folder: `/test/img/${id}/${keys[index]}`,
                                // transformation: [
                                // { width: 800, crop: 'limit'}
                                // ]
                            }
                        )

                        // console.log(result)

                        data.push({ url: result.secure_url, folder: keys[index], public_id: result.public_id })

                        fs.unlink(`uploads/${keys[index]}/${req.files[keys[index]].name}`, function (err) {
                            if (err) {
                                console.log(err)
                            }

                            fs.rmdir(`uploads/${keys[index]}`, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        })

                        if (data.length == keys.length) {
                            await Schedule.findByIdAndUpdate(id, { tempUrl: data })

                            return res.status(200).json({ msg: 'Archivos almacenados en la nube' })
                        }

                    } catch (error) {
                        console.log(error)
                    }
                })
            })
        }

    },

    putLegalization: async (req, res) => {
        const { id } = req.params

        const { collections, status, legalization } = req.body

        const data = { results: req.body.results, conclusions: req.body.conclusions, legalization: { signature: {} } }

        const schedule = await Schedule.findOne({ _id: id })

        if (schedule.legalization) {
            data.legalization = schedule.legalization
        }


        schedule.status.index = status.index

        schedule.status.data = status.data

        schedule.status.justification = status.justification ? status.justification : null

        data.status = schedule.status

        console.log(legalization)

        if (legalization.signature.supervisor) {
            data.legalization.signature.supervisor = legalization.signature.supervisor
        }

        if (legalization.signature.contractor) {
            data.legalization.signature.contractor = legalization.signature.contractor
        }

        if (legalization.signature.publicWorker) {
            data.legalization.signature.publicWorker = legalization.signature.publicWorker
        }

        if (legalization.createdAt) {
            data.legalization.createdAt = legalization.createdAt
        }

        if (status.index == 4) {
            data.legalization = legalization
        }

        console.log(data)

        if (schedule.tempUrl.length !== 0) {
            for (let index = 0; index < schedule.tempUrl.length; index++) {
                for (let mainIndex = 0; mainIndex < collections.length; mainIndex++) {
                    if (collections[mainIndex].keys.includes(schedule.tempUrl[index].folder)) {
                        collections[mainIndex].items.push({ url: schedule.tempUrl[index].url, public_id: schedule.tempUrl[index].public_id })
                    }
                }
            }
        }

        data.collections = collections

        data.tempUrl = []

        await Schedule.findByIdAndUpdate(id, data)

        //const creator = await User.findOne({ mail: schedule.contract.mail }).populate('supervisor');

        const creator = await User.findById(req.body.userId).populate('supervisor')
        const sup = await User.findById(req.body.userId)

        const link = process.env.CLIENT_URL

        if (req.body.status.data === 'Legalización firmada por Contratista') {
            let mailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: creator.supervisor.mail,
                subject: 'Legalización Firmada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">LEGALIZACIÓN FIRMADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${creator.supervisor.name},</p>
                    <p style="font-size: 16px; color: #333;">El contratista <strong>${creator.name}</strong> ha firmado una legalización. Queda pendiente por su
                    firma o rechazo.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]
            };

            sendEmail.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log('Error al enviar correo de legalizacion firmada al supervisor:', error);
                } else {
                    console.log('Correo de legalización al supervisor enviado correctamente');
                }
            });

        } else if (req.body.status.data === 'Legalización Rechazada') {

            let SupervisorMailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: schedule.contract.mail,
                subject: 'Agenda Rechazada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                         <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                         <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                         <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                         </div><br />
                         <p style="font-size: 16px; color: #333;font-weight:bold">LEGALIZACIÓN RECHAZADA</p>
                         <img src="cid:rechazar" alt="Rechazar" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                         <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${schedule.contract.contractorName},</p>
                         <p style="font-size: 16px; color: #333;">Su supervisor de contrato <strong>${sup.name}</strong> ha rechazado su legalización con la 
                         siguiente justificacion: <strong>${schedule.status.justification}</strong></p>
                         <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                         <span>*Este correo es generado automáticamente, por favor no responder</span>
                     </div>
                     `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'rechazar.png',
                    path: './images/rechazar.png',
                    cid: 'rechazar'
                }]
            }
            sendEmail.sendMail(SupervisorMailOptions, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo de rechazo de legalización enviado a contratista');
                }
            });
        } else if (req.body.status.data === 'Legalización firmada por Supervisor') {

            let mailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: schedule.contract.mail,
                subject: 'Legalización aprobada y firmada',
                html: `<div style="border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto;text-align:center">
                    <div style="background-color: #39a900; text-align: center; line-height: 50px;padding:10px">
                    <img src="cid:logo_sena" alt="Logo del Sena" style="vertical-align: middle; width: 50px; height: 50px;">
                    <h1 style="color:white; display: inline-block; margin-left:10px; line-height: normal;">VILE</h1>
                    </div><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">LEGALIZACIÓN FIRMADA</p>
                    <img src="cid:aceptar" alt="Aceptación" style="display: block; margin: 0 auto; max-width: 20%; height: auto;"><br />
                    <p style="font-size: 16px; color: #333;font-weight:bold">Hola ${schedule.contract.contractorName},</p>
                    <p style="font-size: 16px; color: #333;">Su supervisor de contrato <strong>${schedule.supervisor.name}</strong> ha aprobado y firmado su legalización.</p>
                    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #39a900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; margin: 20px auto;">IR A VILE</a><br />
                    <span>*Este correo es generado automáticamente, por favor no responder</span>
                </div>
                `,
                attachments: [{
                    filename: 'logo-sena-blanco.png',
                    path: './images/logo-sena-blanco.png',
                    cid: 'logo_sena'
                },
                {
                    filename: 'aceptar.png',
                    path: './images/aceptar.png',
                    cid: 'aceptar'
                }]

            };

            sendEmail.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo de aprobación de legalización enviado a contratista');
                }
            });
        }
        return res.status(200).json({ msg: 'Agenda prueba' })
    }
}

export { httpSchedule }