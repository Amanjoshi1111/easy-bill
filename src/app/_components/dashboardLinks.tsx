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
                            "flex items-center rounded-sm px-4 py-1 transition-colors",
                            isActive
                                ? "bg-gray-200 dark:bg-gray-900"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}
                    >
                        <div className="text-md font-[500] text-black dark:text-white">{link.name}</div>
                    </Link>
                );
            })}
        </>
    );

}