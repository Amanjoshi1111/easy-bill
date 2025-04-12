// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
// import { SubmitButton } from "@/components/submitButton";
// import { loginFormSubmit } from "./_actions/loginAction";
import GithubButton from "./_components/GithubButton";

export default async function Login() {

    return <div className="flex justify-center items-center h-screen w-full p-4">
        <Card className="shadow-2xl py-6 w-80">
            <CardHeader>
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <Mail strokeWidth={1.75} />
                    </div>
                    <CardTitle className="text-xl">Welcome</CardTitle>
                    <CardDescription className="text-center -mb-2">Enter your email to access your account</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <GithubButton />
            </CardContent>
        </Card>
    </div >
}
