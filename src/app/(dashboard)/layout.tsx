import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { links } from "@/lib/constants";
import { signOut } from "@/auth";
import { Toaster } from "react-hot-toast";
import DashboardLinks from "../_components/dashboardLinks";
import { User2 } from "lucide-react";
import LogoSection from "../_components/logoSection";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (<>
        <div className="h-16 w-full border-b"></div>
        <div className="h-screen relative m-auto w-[1000px] z-10 bottom-16 ">
            <div className="h-16 w-full flex items-center justify-between px-4 shrink-0">
                <div>
                    <LogoSection />
                </div>
                <div className="flex w-50 justify-between gap-2">
                    <DashboardLinks />
                </div>
                <div className="w-60 flex justify-end ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                            <Button variant="outline" className="rounded-full size-11" size="icon">
                                <User2 className="size-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[10rem]">
                            <DropdownMenuLabel className="font-bold text-lg">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {links.map(link => (
                                <DropdownMenuItem key={link.id} asChild className="text-base hover:cursor-pointer">
                                    <Link href={link.href}>{link.name} </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <form action={async () => {
                                    "use server";
                                    await signOut({
                                        redirectTo: "/login"
                                    });
                                }}>
                                    <button className="text-base hover:cursor-pointer w-full text-left" >Logout</button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="h-min-screen p-4 ">
                {children}
            </div>
        </div>
        <Toaster />
    </>
    );
}
