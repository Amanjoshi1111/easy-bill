"use client";
import { Button } from "@/components/ui/button";
import { TIMELINE_BUTTON_TEXTS } from "@/lib/constant";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function TimelineButton({ idx }: { idx: number }) {

    const [selectedButton, setSelectedButton] = useState<number>(idx);

    const handlerButtonClick = (idx: number) => {
        setSelectedButton(idx);
        redirect(`/dashboard?id=${idx}`);
    }

    return <div className="flex gap-2 px-2 py-2 border rounded-md shadow-lg 
    [&>*]:hover:cursor-pointer [&>*]:hover:text-white">
        {Object.keys(TIMELINE_BUTTON_TEXTS).map((text, idx) => (
            <Button
                className={`${selectedButton == idx ? "" : "hover:bg-gray-700"}`}
                variant={`${selectedButton == idx ? "default" : "outline"}`}
                key={idx}
                onClick={() => handlerButtonClick(idx)}
            >
                {text}
            </Button>))}
    </div>
}