"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ArrowRightIcon, Loader } from "lucide-react";

type SubmitButtonProp = {
    text: String,
    loadingText: String
}
export function SubmitButton({ text, loadingText }: SubmitButtonProp) {

    const { pending } = useFormStatus();

    if (!pending) {
        return <Button type="submit" className="w-full cursor-pointer hover:underline">{text}<ArrowRightIcon strokeWidth={1.75} /></Button>
    }
    return <Button disabled className="w-full cursor-not-allowed">{loadingText}<Loader className="animate-spin"></Loader></Button>
}