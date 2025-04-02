"use server";
import { parseValidationError } from "@/lib/utils";
import { onboardingFormSchema, OnboardingFormSchema, OnboardingFormState } from "../types";
import { userSession } from "@/hooks/sessionHook";
import { prisma } from "@/db";

export const onboardingUserAction = async (rawData: OnboardingFormSchema): Promise<OnboardingFormState> => {

    const session = await userSession();

    const validated = onboardingFormSchema.safeParse(rawData);
    try {
        if (!validated.success) {
            return { success: false, errors: parseValidationError(validated.error) };
        }

        await prisma.user.update({
            where: {
                id: session.user?.id
            },
            data: {
                firstName: validated.data.firstName,
                lastName: validated.data.lastName,
                address: validated.data.address,
                isOnboarded: true
            }
        });

        return { success: true };

    } catch {
        return { success: false, message: "INTERNAL SERVER ERROR", inputs: rawData, errors: {} };
    }
}