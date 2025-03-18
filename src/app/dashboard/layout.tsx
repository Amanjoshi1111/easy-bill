import { userSession } from "@/utils/sessionHook"
import { Menu, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/favicon.ico";
import DashboardLinks from "@/app/dashboard/dashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { links } from "@/utils/constants";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await userSession();    

    return <div className="grid min-h-screen w-full md:grid-cols-[250px_1fr]
     lg:grid-cols-[300px_1fr]">
        <div className="hidden border-r md:block bg-gray-100">
            <div className="flex flex-col items-center max-h-screen gap-2 h-full">
                <div className="h-20 flex pl-6 items-center border-b w-full">
                    <Link href={"/"} className=" flex items-center gap-2 text-3xl font-bold">
                        <Image src={Logo} alt="Logo" className="size-10"></Image>
                        <p>Easy<span className="text-orange-500">Billing</span></p>
                    </Link>
                </div>
                <div className="w-full">
                    <nav className="flex flex-col px-2">
                        <DashboardLinks />
                    </nav>
                </div>
            </div>
        </div>
        <div className="flex flex-col ">
            <header className="flex px-4 md:px-6 items-center h-20 border-b bg-gray-100">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden"><Menu className="size-5" /></Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="mt-10 gap-2 px-2">
                            <DashboardLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="ml-auto">
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
                                <DropdownMenuItem asChild className="text-base hover:cursor-pointer">
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
            </header>
            <main className="flex flex-1 px-6 py-4">
                {children}
            </main>
        </div>
    </div>
}