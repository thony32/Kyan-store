import type { Product } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ViewItemState {
    open: boolean
    item: Product | null
    setOpen: (open: boolean | Product) => void
}

export const useViewItemStore = create<ViewItemState>()(
    immer((set) => ({
        open: false,
        item: null,
        setOpen: (open: boolean | Product) => {
            set((state) => {
                if (!open) {
                    state.open = false
                    return
                }
                state.open = true
                if (typeof open !== 'boolean') {
                    state.item = open
                }
            })
        }
    }))
)
