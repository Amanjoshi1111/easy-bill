
import { userSession } from "@/utils/sessionHook"
import OnboardingForm from "./onboardingForm";

export default async function OnboardingPage() {

    const session = await userSession();

    return <OnboardingForm/>
}