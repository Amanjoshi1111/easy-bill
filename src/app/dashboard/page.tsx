import { signOut } from "@/auth";
import { userSession } from "../../utils/hooks/sessionHook";

export default async function Dashboard() {

    const session = await userSession();

    return <>
        <h1>dashboard dfsdffd</h1>
        <button onClick={async () => {
            "use server";
            await signOut({redirectTo: "/"});
        }}>Signout</button>
    </>

}