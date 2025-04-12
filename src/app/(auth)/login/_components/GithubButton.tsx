"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { githubLogin } from "../_actions/loginAction";

export default function GithubButton() {
    return <>
        <Button variant={"outline"} className="hover:cursor-pointer w-full" 
            onClick={githubLogin}
        ><Github /> Continue with GitHub</Button>
    </>
}