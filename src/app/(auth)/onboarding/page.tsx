import OnboardingForm from "./onboardingForm";
import isUserOnboarded from "@/hooks/onboardingCheck";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {


    const isOnboarded = await isUserOnboarded();
    if (isOnboarded) {
        redirect("/dashboard");
    }

    return <OnboardingForm />
}