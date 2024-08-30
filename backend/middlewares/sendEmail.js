import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    ignoreTLS: false,
    auth: {
        user: 'vilecat270@gmail.com',
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: true,
    }
})

// verify connection configuration
sendEmail.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("el servidor está listo para enviar correos");
    }
});

export default sendEmail