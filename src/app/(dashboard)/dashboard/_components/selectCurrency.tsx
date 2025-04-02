import { Select } from "@/components/ui/select"
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Currency } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";

export default function SelectCurrency({ selectIndex, setSelectIndex }: {
    selectIndex: string,
    setSelectIndex: Dispatch<SetStateAction<Currency>>
}) {

    return <Select defaultValue={selectIndex} onValueChange={(value) => setSelectIndex(value as Currency)} >
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel></SelectLabel>
                {Object.values(Currency).map((key, idx) => (<SelectItem key={idx} value={key}>{key}</SelectItem>))}
            </SelectGroup>
        </SelectContent>
    </Select>
}