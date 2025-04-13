"use client";

import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { userStore } from "@/store/store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitchButton() {

    const { setTheme } = useTheme();

    const theme = userStore(store => store.theme);
    const setThemeState = userStore(store => store.setTheme);

    return <>
        <Button className="h-8 w-8 cursor-pointer dark:text-white" variant={"ghost"} onClick={() => {
            const newTheme = (theme === Theme.dark) ? Theme.light : Theme.dark;
            setThemeState(newTheme);
            setTheme(newTheme);
        }} >
            {(theme == Theme.dark) ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
    </>
}