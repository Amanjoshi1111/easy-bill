"use client";
import { Github } from "@/components/logos/Github";
import { Button } from "@/components/ui/button";
import { userStore } from "@/store/store";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GithubButton() {

    const searchParams = useSearchParams();
    const setSignInError = userStore(store => store.setSignInError);

    useEffect(() => {
        const urlError = searchParams.get("error");
        if (urlError === "OAuthAccountNotLinked") {
            setSignInError("Looks like you already have an account with this email. Please log in using your original sign-in method.")
        }
    }, [searchParams, setSignInError]);
    
    return <>
        <Button variant={"outline"} className="hover:cursor-pointer w-full"
            onClick={async () => {
                await signIn("github", {
                    redirect: false,
                    redirectTo: "/"
                })
            }}
        ><Github /> Continue with GitHub</Button>
    </>
}