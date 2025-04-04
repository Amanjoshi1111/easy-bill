import { Currency } from "@prisma/client";
import { create } from "zustand";

interface UserState {
    btnIndex: number,
    currency: Currency
}

interface Actions {
    setBtnIndex: (updatedIndex: number) => void,
    setCurrency: (currency: Currency) => void
}
export const userStore = create<UserState & Actions>((set) => ({
    //Btn State
    btnIndex: 0,
    setBtnIndex: (btnIndex) => set({ btnIndex }),
    //Currency state
    currency: Currency.INR,
    setCurrency: (currency: Currency) => set({ currency })
}))