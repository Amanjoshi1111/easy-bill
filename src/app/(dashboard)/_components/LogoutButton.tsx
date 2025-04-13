import { signOut } from "@/auth";

export default function LogoutButton() {
    return <form action={async () => {
        "use server";
        await signOut({
            redirectTo: "/"
        });
    }}>
        <button className="text-base hover:cursor-pointer w-full text-left" >Logout</button>
    </form>
}