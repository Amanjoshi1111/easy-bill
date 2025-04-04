import { defaultDashboardCardData, defaultGraphDataEntry } from "@/lib/constant";
import { DashboardCardData, DashboardGraphDataEntry } from "@/lib/types";
import { Currency } from "@prisma/client";
import { create } from "zustand";

interface UserState {
    btnIndex: number,
    currency: Currency,
    dashboardCardData: DashboardCardData,
    graphData: [DashboardGraphDataEntry]
}

interface Actions {
    setBtnIndex: (updatedIndex: number) => void,
    setCurrency: (currency: Currency) => void,
    setDashboardCardData: (dashboardCardData: DashboardCardData) => void,
    setGraphData: (graphData: [DashboardGraphDataEntry]) => void
}

export const userStore = create<UserState & Actions>((set) => ({
    //Date range button 
    btnIndex: 0,
    setBtnIndex: (btnIndex) => set({ btnIndex }),
    //Currency select button
    currency: Currency.INR,
    setCurrency: (currency) => set({ currency }),
    //Dashboard cards info
    dashboardCardData: defaultDashboardCardData,
    setDashboardCardData: (dashboardCardData) => set({ dashboardCardData }),
    //Graph data
    graphData: [defaultGraphDataEntry],
    setGraphData: (graphData) => set({ graphData })
}))