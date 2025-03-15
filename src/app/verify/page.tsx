import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
    return <div className="flex h-screen w-full justify-center items-center p-4">
        <Card className="w-[300px] shadow-2xl">
            <div className="flex flex-col items-center space-y-2">
                <div className="h-16 w-16 bg-green-300 rounded-full flex justify-center items-center" >
                    <Mail size={35} className="text-green-900" />
                </div>
                <CardTitle className="text-xl">Check your Email</CardTitle>
                <CardDescription className="text-center">
                    We sent you a magic link to sign in. <br />
                    Click the link in your email to sign in
                </CardDescription>
                <CardFooter className="w-full pt-4">
                    <Link href={"/"} className={buttonVariants({ className: "w-full" })}>
                        <ArrowLeft className="size-3.5"/> Redirect to homepage
                    </Link>
                </CardFooter>
            </div>
        </Card>
    </div>
}