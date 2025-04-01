import { userSession } from "@/hooks/sessionHook";
import Dashboard from "./_components/dashboard";

export default async function DashboardPage() {

    await userSession();

    return <>
        <Dashboard />
    </>
}