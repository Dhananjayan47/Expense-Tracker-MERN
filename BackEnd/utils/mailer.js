// const nodemailer = require("nodemailer");
// const sendMail = async (to, subject, html) => {
//     console.log("Starting sendMail function..."); 
// try {
    
//     const transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.USER_ID,
//             pass: process.env.USER_PASS,
//         },
//         debug:true,
//         logger:true,
//         connectionTimeout:30000,
//     });

//     console.log("Transporter created"); // Debug

//     const mailOptions = {
//         from:`"EXPENSE TRACKER" <${process.env.USER_ID}>`,
//         to,
//         subject,
//         html,
//     };
//     console.log("Sending email to:", to); // Debug

//     const info =await transport.sendMail(mailOptions);

//     console.log("Email sent successfully!");
//     console.log('email sent :',info);
//     return info
// } catch (error) {
//     console.error('error sending message :',error);
//     throw error
// }};

// module.exports = sendMail;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.USER_PASS);

const sendMail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.USER_ID,
      subject,
      html,
    };

    const info = await sgMail.send(msg);
    console.log("Email sent successfully!", info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
};

module.exports = sendMail;
