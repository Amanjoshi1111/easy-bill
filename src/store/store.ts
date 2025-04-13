import { defaultDashboardCardData } from "@/lib/constant";
import { Currency, DashboardCardData, Theme } from "@/lib/types";
import { create } from "zustand";



interface UserState {
    btnIndex: number,
    currency: string,
    currencyList: Currency[],
    dashboardCardData: DashboardCardData,
    activeGraphIdx: number,
    theme: Theme,
    signInError: string | null
    // graphData: DashboardGraphDataEntry[]
}

interface Actions {
    setBtnIndex: (updatedIndex: number) => void,
    setCurrency: (currency: string) => void,
    setCurrencyList: (currenyList: Currency[]) => void,
    setDashboardCardData: (dashboardCardData: DashboardCardData) => void,
    setActiveGraphIdx: (activeGraphIdx: number) => void,
    setTheme: (theme: Theme) => void
    setSignInError: (signInError: string) => void
}

export const userStore = create<UserState & Actions>((set) => ({
    //Date range button 
    btnIndex: getLocalStorageNumber("btnIndex", 0),
    setBtnIndex: (btnIndex) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("btnIndex", btnIndex.toString())
        }
        set({ btnIndex })
    },

    //Currency select button
    currency: getLocalStorageItem("currency", "USD"),
    setCurrency: (currency) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("currency", currency);
        }
        set({ currency })
    },

    //Currency list 
    currencyList: [],
    setCurrencyList: (currencyList) => set({ currencyList }),

    //Dashboard cards info
    dashboardCardData: defaultDashboardCardData,
    setDashboardCardData: (dashboardCardData) => set({ dashboardCardData }),

    //Active graph
    activeGraphIdx: getLocalStorageNumber("activeGraphIdx", 0),
    setActiveGraphIdx: (activeGraphIdx) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("activeGraphIdx", activeGraphIdx.toString())
        }
        set({ activeGraphIdx })
    },

    //Theme 
    theme: getLocalStorageItem("theme", "dark") as Theme,
    setTheme: (theme: Theme) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
        }
        set({ theme });
    },

    //SignInError 
    signInError: null,
    setSignInError: (signInError) => set({ signInError }),
}))

function getLocalStorageItem(key: string, defaultValue: string) {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
        return (data !== null) ? data : defaultValue;
    }
    return defaultValue;
}

function getLocalStorageNumber(key: string, defaultValue: number) {
    const data = getLocalStorageItem(key, defaultValue.toString());
    return Number(data);
}
