import { create } from "zustand";

interface UserState {
    btnIndex: number
}

interface Actions {
    setBtnIndex: (updatedIndex: number) => void
}
export const userStore = create<UserState & Actions>((set) => ({
    btnIndex: 0,
    setBtnIndex: (btnIndex) => set({ btnIndex })
}))