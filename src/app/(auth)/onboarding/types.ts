import z from "zod";

export const onboardingFormSchema = z.object({
    firstName: z.string()
        .min(1, "First Name is required")
        .min(2, "Minimum length should be 2 characters")
        .max(30, "Maximum length only 30 characters"),

    lastName: z.string()
        .min(1, "Last Name is required")
        .min(2, "Minimum length should be 2 characters")
        .max(30, "Maximum length only 30 characters"),

    address: z.string()
        .min(1, "Address is required")
        .min(5, "Mininum length should be 5 characters")
        .max(30, "Maximum length only 50 characters")
})

export type OnboardingFormState = {
    success: boolean,
    errors?: OnboardingFromStateErrors
    message?: string,
    inputs?: OnboardingFormSchema,
    blurs?: OnboardingFormBlurs
}

export type OnboardingFormSchema = z.infer<typeof onboardingFormSchema>
export type OnboardingFromStateErrors = Partial<Record<keyof OnboardingFormSchema, string>>
export type OnboardingFormBlurs = Record<keyof OnboardingFormSchema, boolean>