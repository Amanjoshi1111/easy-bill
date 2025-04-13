"use client";
import Logo from "@/app/favicon.ico";
import Image from "next/image";
import Link from "next/link";

export default function LogoSection() {
    return <Link className="flex items-center gap-2 text-3xl font-bold w-60 cursor-pointer" href={"/"}>
        <Image src={Logo} alt="Logo" className="size-10 rotate-90  dark:border-white dark:border-2 dark:rounded-full"></Image>
        <p className="dark:text-white">Easy<span className="text-orange-500">Billing</span></p>
    </Link>
}