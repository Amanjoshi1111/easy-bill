import z from "zod";

export const onboardingSchema = z.object({
    firstName: z.string({
        required_error: "First name is required"
    }).min(2, "Minimum length should be 2 characters")
        .max(30, "Maximum length only 30 characters"),

    lastName: z.string({
        required_error: "Last name is required"
    }).min(2, "Minimum length should be 2 characters")
        .max(30, "Maximum length only 30 characters"),

    address: z.string({
        required_error: "Address is required"
    }).min(5, "Mininum length should be 5 characters")
        .max(30, "Maximum length only 50 characters")
})