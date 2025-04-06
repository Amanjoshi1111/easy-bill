import { Select } from "@/components/ui/select"
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currencyListHref } from "@/lib/utils";
import { userStore } from "@/store/store";
import React, { useEffect } from "react";

export default function SelectCurrency() {

    const currency = userStore((state) => state.currency);
    const setCurrency = userStore((state) => state.setCurrency);
    const currencyList = userStore((state) => state.currencyList);
    const setCurrencyList = userStore((state) => state.setCurrencyList);

    useEffect(() => {
        async function getCurrencyList() {
            const response = await fetch(currencyListHref());
            const currencyData = await response.json();
            setCurrencyList(currencyData.data);
        }
        getCurrencyList();
    }, [setCurrencyList])



    return <Select defaultValue={currency} onValueChange={(value) => setCurrency(value)} >
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel></SelectLabel>
                {currencyList.map((data, idx) => (<SelectItem value={data.name} key={idx} >{`${data.name}`}</SelectItem>))}
                {/* {Object.values(Currency).map((key, idx) => (<SelectItem key={idx} value={key}>{`${key} ($)`}</SelectItem>))} */}
            </SelectGroup>
        </SelectContent>
    </Select>
}