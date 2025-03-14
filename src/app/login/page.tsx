import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRightIcon } from "lucide-react";

export default function Page() {
    return <>
        <div className="flex justify-center items-center h-screen w-full p-4">
            <Card className="w-max-lg">
                <CardHeader>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
                            <Mail strokeWidth={1.75} />
                        </div>
                        <CardTitle className="text-xl">Welcome</CardTitle>
                        <CardDescription className="text-center">Enter your email to access your account</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="email" className="block text-center">Email address</Label>
                            //TODO: INSERT EMAIL ICON IN LEFT SIDE OF INPUT
                            <Input placeholder="abcd@gmail.com" />
                            <p className="text-xs text-center text-muted-foreground">We'll send you a secure login link to your email</p>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex justify-center">
                        <Button className="w-full cursor-pointer hover:underline">Continue with email<ArrowRightIcon strokeWidth={1.75} /></Button>
                    </div>
                </CardFooter>
            </Card>
        </div >
    </>
}