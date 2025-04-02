"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingFormSchema, OnboardingFormSchema } from "./types";
import { onboardingUserAction } from "./_actions/onboardingActions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Loader } from "lucide-react";


const initialOnboardingData: OnboardingFormSchema = {
    firstName: "",
    lastName: "",
    address: ""
}

export default function OnboardingForm() {

    const router = useRouter();

    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<OnboardingFormSchema>({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues: initialOnboardingData,
        mode: "onChange"
    });

    const onSubmitHandler = async (data: OnboardingFormSchema) => {

        const { success, errors } = await onboardingUserAction(data);

        if (success) {
            alert("SUCCESS");
            router.push("/dashboard");
        } else {
            Object.entries(errors!).forEach(([key, message]) => {
                setError(key as keyof OnboardingFormSchema, {
                    type: "server",
                    message
                })
            })
        }
    }

    return <div className="h-screen w-screen flex items-center justify-center">
        <Card className="w-[500px]">
            <CardHeader className="font-medium text-2xl gap-3">
                <CardTitle>Onboarding</CardTitle>
                <CardDescription >Complete basic onboarding to access ourN dashboard</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmitHandler)} method="post">
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-4 space-y-4">
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    type="firstName"
                                    placeholder="Aman"
                                    {...register('firstName')}
                                />
                                {errors?.firstName
                                    && <div className="text-red-400 text-sm">
                                        {errors.firstName.message}
                                    </div>
                                }
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    type="lastName"
                                    placeholder="Joshi"
                                    className="w-full"
                                    {...register("lastName")}
                                // defaultValue={serverState.inputs?.lastName}
                                />
                                {errors?.lastName
                                    && <div className="text-red-400 text-sm">
                                        {errors.lastName.message}
                                    </div>}
                            </div>
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                type="address"
                                placeholder="Mayur vihar, Delhi"
                                {...register("address")}
                            // defaultValue={serverState.inputs?.address} 
                            />
                            {errors?.address
                                && <div className="text-red-400 text-sm">
                                    {errors.address.message}
                                </div>
                            }
                        </div>
                        <div className="mt-4">
                            {isSubmitting
                                ?
                                <Button disabled className="w-full cursor-not-allowed">Loading<Loader className="animate-spin"></Loader></Button>
                                :
                                <Button type="submit" className="w-full cursor-pointer hover:underline">Finish Onboarding<ArrowRightIcon strokeWidth={1.75} /></Button>
                            }
                            {/* <SubmitButton text={"Finish Onboarding"} loadingText={"Onboarding User"} /> */}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div >
}