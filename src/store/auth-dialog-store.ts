import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AuthDialogState {
    shouldOpen: boolean
    setShouldOpen: (open: boolean) => void
}

export const useAuthDialogStore = create<AuthDialogState>()(
    immer((set) => ({
        shouldOpen: false,
        setShouldOpen: (open: boolean) => {
            set((state) => {
                state.shouldOpen = open
            })
        }
    }))
)
