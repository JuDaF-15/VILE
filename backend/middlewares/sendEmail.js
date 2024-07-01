import nodemailer from "nodemailer";

const sendEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    ignoreTLS: true,
    auth: {
        user: 'vilecat270@gmail.com',
        pass: 'hnwc vnqe lzwf rlyz'
    },
    tls: {
        rejectUnauthorized: false,
    }
})

sendEmail.verify().then(() => {
    console.log('Envio de email listo');
});

export default sendEmail
