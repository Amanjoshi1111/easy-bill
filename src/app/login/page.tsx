import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { SubmitButton } from "@/components/submitButton";
import { loginFormSubmit } from "./_actions/loginAction";

export default async function Login() {

    const session = await auth();
    if (session?.user) {
        redirect("/dashboard");
    }

    return <div className="flex justify-center items-center h-screen w-full p-4">
        <Card className="w-max-lg shadow-2xl py-6">
            <CardHeader>
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
                        <Mail strokeWidth={1.75} />
                    </div>
                    <CardTitle className="text-xl">Welcome</CardTitle>
                    <CardDescription className="text-center -mb-2">Enter your email to access your account</CardDescription>
                </div>.
            </CardHeader>
            <CardContent>
                <form action={loginFormSubmit}>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="block text-center">Email address</Label>
                        {/* TODO: INSERT EMAIL ICON IN LEFT SIDE OF INPUT */}
                        <Input type="email" name="email" required className="focus-visible:ring-0" placeholder="abcd@gmail.com" />
                        <p className="text-xs px-2 text-center text-muted-foreground">We&apos;ll  send you a secure login link to your email</p>
                        <CardFooter className="w-full px-0 pt-4">
                            <div className="w-full flex justify-center">
                                <SubmitButton text={"Continue with email"} loadingText={"Signing In"} />
                            </div>
                        </CardFooter>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div >
}
