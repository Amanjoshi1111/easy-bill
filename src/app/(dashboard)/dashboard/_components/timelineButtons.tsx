"use client";
import { Button } from "@/components/ui/button";
import { TIMELINE_BUTTON_TEXTS } from "@/lib/constant";
import { Dispatch, SetStateAction } from "react";

export default function TimelineButton({ setBtnIndex, btnIndex }: {
    btnIndex: number
    setBtnIndex: Dispatch<SetStateAction<number>>,
}) {

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