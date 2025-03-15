"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ArrowRightIcon, Loader } from "lucide-react";

export function SubmitButton() {

    const { pending } = useFormStatus();

    if (!pending) {
        return <Button type="submit" className="w-full cursor-pointer hover:underline">Continue with email<ArrowRightIcon strokeWidth={1.75} /></Button>
    }
    return <Button disabled className="w-full cursor-not-allowed">Signing In<Loader className="animate-spin"></Loader></Button>
}