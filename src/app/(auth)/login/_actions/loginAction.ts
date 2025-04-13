import { signIn } from "@/auth";

export const githubLogin = async () => {
    const loginResponse = await signIn("github", {
        redirect: false,
        redirectTo: "/"
    });

    console.log("github login resp", {loginResponse});
}

export const googleLogin = async () => {
    const loginResponse = await signIn("google", {
        redirect: false,
        redirectTo: "/"
    })
    console.log("google login resp", {loginResponse});
}

export const loginFormSubmit = async (formData: FormData) => {
    await signIn("nodemailer", formData);
};