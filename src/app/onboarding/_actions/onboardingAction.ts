"use server";
import { userSession } from "../../../utils/sessionHook";
import { onboardingFormSchema, OnboardingFormSchema, OnboardingFormState } from "./types";

export const onboardingUserAction = async (prevState: OnboardingFormState, formData: FormData): Promise<OnboardingFormState> => {

    await userSession();

    const rawData: OnboardingFormSchema = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get("lastName") as string,
        address: formData.get("address") as string
    }

    try {
        const validated = onboardingFormSchema.safeParse(rawData);
        if (!validated.success) {
            return { success: false, errors: validated.error.flatten().fieldErrors, inputs: rawData };
        } else {
            console.log("CHiite suit te daag pe gye");
            return { success: true};
        }
    } catch (err) {
        return { success: false, message: "INTERNAL SERVER ERROR", inputs: rawData };
    }


}