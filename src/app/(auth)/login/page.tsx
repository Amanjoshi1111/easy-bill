"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { userStore } from "@/store/store";
import { Google } from "@/components/logos/Google";
import { Github } from "@/components/logos/Github";
import SignInButton from "./_components/GenericSignInButton";

const LoginButtons = [
    {
        provider: "google",
        logo: <Google />
    },
    {
        provider: "github",
        logo: <Github />
    }
]

export default function Login() {

    const signInError = userStore(store => store.signInError);

    return <div className="flex justify-center items-center h-screen w-full p-4">
        <Card className="shadow-2xl py-6 w-100">
            <CardHeader>
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <Mail strokeWidth={1.75} />
                    </div>
                    <CardTitle className="text-xl">Welcome</CardTitle>
                    <CardDescription className="text-center -mb-2">Enter your email to access your account</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {LoginButtons.map((button, idx) => <SignInButton key={idx} provider={button.provider} logo={button.logo} />)}
                {signInError && <div className="border rounded-md bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800 py-4 px-3 text-sm text-center">
                    <p className="text-red-600 dark:text-red-400 text-sm">{signInError}</p>
                </div>}
            </CardContent>
        </Card>
    </div >
}
