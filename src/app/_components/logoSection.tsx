"use client";
import Logo from "@/app/favicon.ico";
import Image from "next/image";
import Link from "next/link";

export default function LogoSection() {
    return <Link className="flex items-center gap-2 text-3xl font-bold w-60 cursor-pointer" href={"/"}>
        <Image src={Logo} alt="Logo" className="size-10 rotate-90"></Image>
        <p>Easy<span className="text-orange-500">Billing</span></p>
    </Link>
}