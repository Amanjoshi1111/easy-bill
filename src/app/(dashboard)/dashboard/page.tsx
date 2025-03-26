import { signOut } from "@/auth";
import { userSession } from "@/hooks/sessionHook";

export default async function Dashboard() {

    await userSession();

    return <div>
        <h1>dashboard dfsdffd</h1>
        <button onClick={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
        }}>Signout</button>
    </div>

}