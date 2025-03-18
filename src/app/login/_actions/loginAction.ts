"use server";
import { signIn } from "@/auth";

export const loginFormSubmit = async (formData: FormData) => {
    const result = await signIn("nodemailer", formData);
};