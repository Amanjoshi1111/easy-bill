"use client";
import { Google } from "@/components/logos/Google";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
    return <>
        <Button variant={"outline"} className="hover:cursor-pointer w-full"
            onClick={async () => {
                const res = await signIn("google", {
                    redirect: false,
                    callbackUrl: "/"
                })
                console.log("google response : ", res);
            }}
        ><Google /> Continue with Google</Button>
    </>
}