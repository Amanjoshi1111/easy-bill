import axios from "axios";
import { RequestOptions } from "https";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

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
headers.append("Authorization", `Bearer ${process.env.MAILTRAP_TOKEN}`);
headers.append("Content-Type", "application/json");

export default async function sendEmail(data: SendEmailProps) {
    const requestOptions: RequestInit = {
        headers,
        method: "POST",
        body: JSON.stringify({
            from: data.from,
            to: data.to,
            subject: data.subject,
            html: data.html,
            category: data.category
        })
    }
    const response = await fetch("https://sandbox.api.mailtrap.io/api/send/3528634", requestOptions);
    return response.json();
};

