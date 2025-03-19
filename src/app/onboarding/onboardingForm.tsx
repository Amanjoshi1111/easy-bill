"use client";
import { SubmitButton } from "@/components/submitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardingUserAction } from "./_actions/onboardingAction";
import { OnboardingFormBlurs, onboardingFormSchema, OnboardingFormSchema, OnboardingFormState, OnboardingFromStateErrors } from "./_actions/types";
import React, { useActionState, useEffect, useRef, useState } from "react";

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
    const [blurs, setBlurs] = useState<OnboardingFormBlurs>(serverState.blurs || initialBlurs)
    const [errors, setErrors] = useState<OnboardingFromStateErrors>(serverState.errors || {});
    const [onboardingData, setOnboardingData] = useState<OnboardingFormSchema>(serverState.inputs || initialOnboardingData);


    useEffect(() => {
        if (serverState.success) {
            setOnboardingData(initialOnboardingData);
            alert("YAY ONBOARDED");
        } else if (serverState.errors) {

        }
        if (serverState.inputs) {
            setOnboardingData(serverState.inputs);
        }
    }, [serverState])

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setBlurs((prev) => ({ ...prev, [name]: true }))
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setOnboardingData((prev) => {
            const updatedData = {
                ...prev,
                [name]: value
            }
            const validated = onboardingFormSchema.safeParse(updatedData);
            if (validated.success) {
                setErrors({});
            } else {
                console.log("ERROR");
                setErrors(validated.error.flatten().fieldErrors);
            }
            return updatedData;
        })
    }

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
                                    onBlur={handleOnBlur}
                                    onChange={handleOnChange}
                                    // defaultValue={serverState.inputs?.firstName}
                                    value={onboardingData.firstName}
                                />
                                {blurs.firstName && errors?.firstName
                                    && <div className="text-red-400 text-sm">
                                        {errors.firstName[0]}
                                    </div>}
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    type="lastName"
                                    name="lastName"
                                    placeholder="Joshi"
                                    className="w-full"
                                    onBlur={handleOnBlur}
                                    onChange={handleOnChange}
                                    // defaultValue={serverState.inputs?.lastname}
                                    value={onboardingData.lastName}

                                />
                                {blurs.lastName && errors?.lastName
                                    && <div className="text-red-400 text-sm">
                                        {errors.lastName[0]}
                                    </div>}
                            </div>
                        </div>
                        <div className="space-y-2 flex-1">
                            <Label htmlFor="address">Address</Label>
                            <Input type="address"
                                name="address"
                                placeholder="Mayur vihar, Delhi"
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                // defaultValue={serverState.inputs?.address}
                                value={onboardingData.address}
                            />
                            {blurs.address && errors?.address
                                && <div className="text-red-400 text-sm">
                                    {errors.address[0]}
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