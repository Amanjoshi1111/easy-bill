import { defaultDashboardCardData } from "@/lib/constant";
import { DashboardCardData } from "@/lib/types";
import { Currency } from "@prisma/client";
import { create } from "zustand";

interface UserState {
    btnIndex: number,
    currency: Currency,
    dashboardCardData: DashboardCardData
}

interface Actions {
    setBtnIndex: (updatedIndex: number) => void,
    setCurrency: (currency: Currency) => void,
    setDashboardCardData: (dashboardCardData: DashboardCardData) => void
}

export const userStore = create<UserState & Actions>((set) => ({
    //Btn 
    btnIndex: 0,
    setBtnIndex: (btnIndex) => set({ btnIndex }),
    //Currency 
    currency: Currency.INR,
    setCurrency: (currency: Currency) => set({ currency }),
    //Dashboard card 
    dashboardCardData: defaultDashboardCardData,
    setDashboardCardData: (dashboardCardData: DashboardCardData) => set({ dashboardCardData })
}))