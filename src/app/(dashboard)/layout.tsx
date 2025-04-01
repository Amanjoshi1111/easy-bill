import isUserOnboarded from "@/hooks/onboardingCheck";
import { userSession } from "@/hooks/sessionHook"
import { redirect } from "next/navigation";



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await userSession();
    const isOnboarded = await isUserOnboarded(session.user?.id as string);
    if (!isOnboarded) {
        redirect("/onboarding");
    }

    return <>
        {children}
    </>
}