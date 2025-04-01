"use client";
import { Button } from "@/components/ui/button";
import { TIMELINE_BUTTON_TEXTS } from "@/lib/constant";
import { Dispatch, SetStateAction } from "react";

export default function TimelineButton({ setBtnIndex, btnIndex }: {
    setBtnIndex: Dispatch<SetStateAction<number>>,
    btnIndex: number
}) {

    return <div className="flex gap-2 px-2 py-2 border rounded-md shadow-lg 
    [&>*]:hover:cursor-pointer">
        {Object.keys(TIMELINE_BUTTON_TEXTS).map((text, idx) => (
            <Button
                className={`${btnIndex == idx ? "" : "hover:bg-gray-300 "}`}
                variant={`${btnIndex == idx ? "default" : "outline"}`}
                key={idx}
                onClick={() => setBtnIndex(idx)}
            >
                {text}
            </Button>))}
    </div>
}