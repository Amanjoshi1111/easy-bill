"use client";
import { Button } from "@/components/ui/button";
import { TIMELINE_BUTTON_TEXTS } from "@/lib/constant";
import { userStore } from "@/store/store";

export default function TimelineButton() {

    const btnIndex = userStore(state => state.btnIndex);
    const setBtnIndex = userStore(state => state.setBtnIndex);

    return <>
        {Object.keys(TIMELINE_BUTTON_TEXTS).map((text, idx) => (
            <Button
                className={`${btnIndex == idx ? "" : "hover:bg-gray-300 "}` + "h-7 px-4"}
                variant={`${btnIndex == idx ? "default" : "outline"}`}
                key={idx}
                onClick={() => setBtnIndex(idx)}
            >
                {text}
            </Button>))}
    </>
}