"use client";
import { links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLinks() {

    const pathname = usePathname();

    return (
        <>
            {links.map(link => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.id}
                        href={link.href}
                        className={cn(
                            "flex items-center rounded-sm px-4 py-1 transition-colors text-md font-[500] text-white dark:text-white hover:text-white ",
                            isActive
                                ? "bg-gray-900 text-white"
                                : "hover:bg-gray-700 text-black"
                        )}
                    >
                        <div>{link.name}</div>
                    </Link>
                );
            })}
        </>
    );

}