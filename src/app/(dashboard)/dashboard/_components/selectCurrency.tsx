import { Select } from "@/components/ui/select"
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userStore } from "@/store/store";
import { Currency } from "@prisma/client";
import React from "react";

export default function SelectCurrency() {

    const currency = userStore((state) => state.currency);
    const setCurrency = userStore((state) => state.setCurrency);

    return <Select defaultValue={currency} onValueChange={(value) => setCurrency(value as Currency)} >
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel></SelectLabel>
                {Object.values(Currency).map((key, idx) => (<SelectItem key={idx} value={key}>{`${key} ($)`}</SelectItem>))}
            </SelectGroup>
        </SelectContent>
    </Select>
}