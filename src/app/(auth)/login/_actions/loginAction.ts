"use server";
import { signIn } from "@/auth";

export const githubLogin = async () => {
    await signIn("github", {
        redirect: true,
        redirectTo: "/"
    });
}

export const loginFormSubmit = async (formData: FormData) => {
    await signIn("nodemailer", formData);
};