"use client";
import { links } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function DashboardLinks() {

    const pathname = usePathname();

    console.log("PATHNAME : ", pathname);


    return <>
        {links.map(link => {
            return <Link
                className={`flex items-center pl-6 h-10 md:h-12 space-x-3 rounded-sm w-full`.concat(" ").concat((pathname == link.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground")}
                href={link.href} key={link.id} >
                <div><link.icon className="size-5 md:size-6"></link.icon></div>
                <div className="text-lg md:text-xl">{link.name}</div>
            </Link>
        })}
    </>
}