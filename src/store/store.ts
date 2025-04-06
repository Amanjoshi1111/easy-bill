import { defaultDashboardCardData } from "@/lib/constant";
import { Currency, DashboardCardData } from "@/lib/types";
import { create } from "zustand";

interface UserState {
    btnIndex: number,
    currency: string,
    currencyList: Currency[],
    dashboardCardData: DashboardCardData,
    // graphData: DashboardGraphDataEntry[]
}

interface Actions {
    setBtnIndex: (updatedIndex: number) => void,
    setCurrency: (currency: string) => void,
    setCurrencyList: (currenyList: Currency[]) => void,
    setDashboardCardData: (dashboardCardData: DashboardCardData) => void,
    // setGraphData: (graphData: DashboardGraphDataEntry[]) => void
}

export const userStore = create<UserState & Actions>((set) => ({
    //Date range button 
    btnIndex: 0,
    setBtnIndex: (btnIndex) => set({ btnIndex }),
    //Currency select button
    currency: "USD",
    setCurrency: (currency) => set({ currency }),
    //Currency list 
    currencyList: [],
    setCurrencyList: (currencyList) => set({ currencyList }),
    //Dashboard cards info
    dashboardCardData: defaultDashboardCardData,
    setDashboardCardData: (dashboardCardData) => set({ dashboardCardData }),
    //Graph data
    // graphData: [defaultGraphDataEntry],
    // setGraphData: (graphData) => set({ graphData })
}))