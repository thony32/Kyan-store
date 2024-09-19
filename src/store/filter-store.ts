import type { Category, Subcategory } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface FilterState {
    selected: Category | null
    subcategory: Subcategory | null
    setSelected: (category: Category | null) => void
    setSubcategory: (subcategory: Subcategory | null) => void
}

export const useFilterStore = create<FilterState>()(
    immer((set) => {
        return {
            selected: null,
            subcategory: null,
            setSelected: (category) => {
                set((state) => {
                    state.selected = category
                    state.subcategory = null
                })
            },
            setSubcategory: (subcategory) => {
                set((state) => {
                    state.subcategory = subcategory
                })
            }
        }
    })
)
