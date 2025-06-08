import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const sendMail = async (
    email: string ,
     subject: string, 
     message: string,
     html: string) => {
    try {
        //Requirement for transporter to send email
        const transporter = nodemailer.createTransport({

            host: "smtp.gmail.com", // Gmail SMTP host
            port: 465,
            service: 'gmail',  // SMTP port for Gmail
            secure: true,  
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASSWORD 
            }
            
        })
        // console.log(auth.user, auth.pass);


        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
            html: html

        }

        const mailRes = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", mailRes);

        if(mailRes.accepted.length > 0){
            return 'Email sent successfully';

        }else if (mailRes.rejected.length > 0){
            return 'Email not sent'
        } else{
            return 'Email server error';
        }

        
    } catch (error: any) {
        return JSON.stringify({
            error: error.message || 'An error occurred while sending the email'})
        
    }

}