"use client";
import { onboardingUser } from "@/app/onboarding/_actions/onboardingAction";
import { SubmitButton } from "@/components/submitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingForm() {
    return <div className="h-screen w-screen flex items-center justify-center">
        <Card className="min-w-sm">
            <CardHeader className="font-medium text-2xl gap-3">
                <CardTitle>Onboarding</CardTitle>
                <CardDescription >Complete basic onboarding to access our dashboard</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={onboardingUser}>
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input type="firstName" name="firstName" placeholder="Aman"></Input>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input type="lastName" name="lastName" placeholder="Joshi"></Input>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input type="address" name="address" placeholder="Mayur vihar, Delhi"></Input>
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