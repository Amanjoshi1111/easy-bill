"use server";
import { parseValidationError } from "@/lib/utils";
import { userSession } from "../../../utils/sessionHook";
import { onboardingFormSchema, OnboardingFormSchema, OnboardingFormState } from "./types";

export const onboardingUserAction = async (rawData: OnboardingFormSchema): Promise<OnboardingFormState> => {

    await userSession();
    await new Promise(resolve => setTimeout(resolve, 3000));

    const validated = onboardingFormSchema.safeParse(rawData);
    try {
        if (!validated.success) {
            return { success: false, errors: parseValidationError(validated.error) };
        } else {
            return { success: true };
        }
    } catch (err) {
        return { success: false, message: "INTERNAL SERVER ERROR", inputs: rawData, errors: {} };
    }
}