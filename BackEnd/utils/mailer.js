const nodemailer = require("nodemailer");
const sendMail = async (to, subject, html) => {
try {
    
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_ID,
            pass: process.env.USER_PASS,
        },
    });

    const mailOptions = {
        from:`"EXPENSE TRACKER" <${process.env.USER_ID}>`,
        to,
        subject,
        html,
    };
    const info =await transport.sendMail(mailOptions);
    console.log('email sent :',info.messageId)
} catch (error) {
    console.error('error sending message :',error)
}};

module.exports = sendMail;
