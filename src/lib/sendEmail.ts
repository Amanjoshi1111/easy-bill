import nodemailer from "nodemailer";
import { NODEMAILER_CONFIG } from "./constant";

type To = {
    email: string
}[]

type From = {
    email: string,
    name: string
}

type SendEmailProps = {
    to: To,
    from: From,
    subject: string,
    html: string,
    category: string
}

const headers = new Headers();
const transporter = nodemailer.createTransport(NODEMAILER_CONFIG.server);

headers.append("Authorization", `Bearer ${process.env.MAILTRAP_TOKEN}`);
headers.append("Content-Type", "application/json");

export default async function sendEmail(data: SendEmailProps) {

    await transporter.sendMail({
        from: NODEMAILER_CONFIG.from,
        to: "aman.joshi1111@gmail.com",
        subject: data.subject,
        html: data.html
    }, (err, info) => {
        if (err) {
            console.log("ERROR : ", err);
        } else {
            console.log("EMIAL SENT : ", info.response);
        }
    });

    // Below code is mailtrap code

    // const requestOptions: RequestInit = {
    //     headers,
    //     method: "POST",
    //     body: JSON.stringify({
    //         from: data.from,
    //         to: data.to,
    //         subject: data.subject,
    //         html: data.html,
    //         category: data.category
    //     })
    // }
    // const response = await fetch("https://sandbox.api.mailtrap.io/api/send/3528634", requestOptions);

    // return response.json();
};

