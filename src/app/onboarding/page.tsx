import { userSession } from "@/hooks/sessionHook"
import OnboardingForm from "./onboardingForm";
import isUserOnboarded from "@/hooks/onboardingCheck";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {

    const session = await userSession();
    const isOnboarded = await isUserOnboarded(session.user?.id as string);
    if (isOnboarded) {
        redirect("/dashboard");
    }

    return <OnboardingForm />
}