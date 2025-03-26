"use server";
import { signIn } from "@/auth";

export const loginFormSubmit = async (formData: FormData) => {
    await signIn("nodemailer", formData);
};