"use client";
import { links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function DashboardLinks() {

    const pathname = usePathname();

    return <>
        {links.map(link => {
            return <Link
                className={cn(`flex  rounded-sm items-center px-4 py-1 `, (pathname == link.href)
                    ? "bg-gray-200"
                    : "hover:bg-gray-100")}
                href={link.href} key={link.id} >
                <div className="text-md font-[450]">{link.name}</div>
            </Link>
        })}
    </>
}