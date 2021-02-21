const nodemailer = require("nodemailer");

export default async function main(file: Uint8Array) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user, 
          pass: testAccount.pass, 
        },
        sendMail: true
    });

    let info = await transporter.sendMail({
        name: "name",
        from: 'bikesAnonymous@example.com',
        to: "ana_v_r97@hotmail.com",
        subject: "Bike Riding License",
        text: "Here you have your bike riding license",
        attachments: [{filename: 'Riding_License', content: file}]
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}