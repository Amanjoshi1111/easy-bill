"use server";
import z from "zod";
import { signIn } from "@/auth";
import { userSession } from "../../../utils/sessionHook";
import { onboardingSchema } from "../../../utils/zodSchemas";

export const onboardingUser = async (formData: FormData) => {
    const session = await userSession();

    try {
        const formDataObj: z.infer<typeof onboardingSchema> = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get("lastName") as string,
            address: formData.get("address") as string
        }

        const validated = onboardingSchema.safeParse(formDataObj);
        if (!validated.success) {
            console.log(validated.error.flatten().fieldErrors);
        }
    } catch (err) {
        console.log("ERROR jaafdsfsa");
    }


}