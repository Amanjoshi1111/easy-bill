import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { links } from "@/lib/constants";
import { auth, signOut } from "@/auth";
import { User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function NavbarLoginLogout() {

    const session = await auth();

    if (!session?.user.id) {
        return <Link href={"/login"} className={cn(buttonVariants({ variant: "default" }), "h-8")}>
            Login
        </Link>
    }

    const imgLink = session.user.image;

    return <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button variant="outline" className="rounded-full border-2 border-black dark:border-white size-11 dark:bg-[#171717] hover:dark:bg-[#171717]" size="icon">
                {imgLink ?
                    <Image
                        src={imgLink}
                        alt="Github Image"
                        height="50"
                        width="50"
                        className="rounded-full"
                    ></Image>
                    // <User2 className="size-6"/>
                    :
                    <User2 className="size-6" />
                }
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
                        redirectTo: "/"
                    });
                }}>
                    <button className="text-base hover:cursor-pointer w-full text-left" >Logout</button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}