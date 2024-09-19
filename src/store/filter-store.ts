import type { Category } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface FilterState {
    selected: Category | null
    setSelected: (category: Category | null) => void
}

export const useFilterStore = create<FilterState>()(
    immer((set) => {
        return {
            selected: null,
            setSelected: (category) => {
                set((state) => {
                    state.selected = category
                })
            }
        }
    })
)
