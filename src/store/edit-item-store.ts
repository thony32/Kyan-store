import type { BaseEntity } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ItemState = {
    item: BaseEntity | null
    setItem: (item: BaseEntity | null) => void
}

export const useItemStore = create<ItemState>()(
    immer((set) => ({
        item: null,
        setItem: (item: BaseEntity | null) => {
            set((state) => {
                state.item = item
            })
        }
    }))
)
