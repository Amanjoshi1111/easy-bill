"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TIMELINE_BUTTON_TEXTS } from "@/lib/constant";
import { userStore } from "@/store/store";

export default function TimelineButton() {

    const btnIndex = userStore(state => state.btnIndex);
    const setBtnIndex = userStore(state => state.setBtnIndex);

    return <Card className="py-2 px-0">
        <CardContent className="flex gap-2 px-3">
            {TIMELINE_BUTTON_TEXTS.map((data, idx) => (
                <Button
                    className={`${btnIndex == idx ? "" : "hover:bg-gray-300 "}` + "h-7 px-4"}
                    variant={`${btnIndex == idx ? "default" : "outline"}`}
                    key={idx}
                    onClick={() => setBtnIndex(idx)}
                >
                    {data.text}
                </Button>))}
        </CardContent>
    </Card>
}