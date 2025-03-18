"use client";
import { SubmitButton } from "@/components/submitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardingUserAction } from "./_actions/onboardingAction";
import { OnboardingFormBlurs, OnboardingFormSchema, OnboardingFormState, OnboardingFromStateErrors } from "./_actions/types";
import { useActionState, useEffect, useRef, useState } from "react";

const initialState: OnboardingFormState = {
    success: false,
    errors: {}
}

const initialOnboardingData: OnboardingFormSchema = {
    firstName: "",
    lastName: "",
    address: ""
}

const initialBlurs: OnboardingFormBlurs = {
    firstName: false,
    lastName: false,
    address: false
}
export default function OnboardingForm() {

    const [serverState, action] = useActionState(onboardingUserAction, initialState);
    // const [errors, setErrors] = useState<OnboardingFromStateErrors>({});
    // const [blurs, setBlurs] = useState<OnboardingFormBlurs>(initialBlurs)
    // const [onboardingData, setOnboardingData] = useState<OnboardingFormSchema>(serverState.inputs || initialOnboardingData);


    useEffect(() => {
        if (serverState.success) {
            alert("YAY ONBOARDED");
        }
    }, [serverState])

    // const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //     const { name } = e.target;
    //     setBlurs((prev) => ({ ...prev, [name]: false }))
    // }

    return <div className="h-screen w-screen flex items-center justify-center">
        <Card className="w-[500px]">
            <CardHeader className="font-medium text-2xl gap-3">
                <CardTitle>Onboarding</CardTitle>
                <CardDescription >Complete basic onboarding to access ourN dashboard</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-4 space-y-4">
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    type="firstName"
                                    name="firstName"
                                    placeholder="Aman"
                                    defaultValue={serverState.inputs?.firstName}
                                />
                                {serverState.errors?.firstName
                                    && <div className="text-red-400 text-sm">
                                        {serverState.errors.firstName[0]}
                                    </div>}
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    type="lastName"
                                    name="lastName"
                                    placeholder="Joshi"
                                    className="w-full"
                                    defaultValue={serverState.inputs?.lastName}
                                />
                                {serverState.errors?.lastName
                                    && <div className="text-red-400 text-sm">
                                        {serverState.errors.lastName[0]}
                                    </div>}
                            </div>
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="address">Address</Label>
                            <Input type="address"
                                name="address"
                                placeholder="Mayur vihar, Delhi"
                                defaultValue={serverState.inputs?.address}
                            />
                            {serverState.errors?.address
                                && <div className="text-red-400 text-sm">
                                    {serverState.errors.address[0]}
                                </div>}
                        </div>
                        <div className="mt-4">
                            <SubmitButton text={"Finish Onboarding"} loadingText={"Onboarding User"} />
                        </div>
                    </div>

                </form>
            </CardContent>
        </Card>
    </div>

}