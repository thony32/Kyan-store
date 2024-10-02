import type { Order } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface OrderState {
    order: Order | null
    setOrder: (order: Order | null) => void
}

export const useOrderStore = create<OrderState>()(
    immer((set) => ({
        order: null,
        setOrder: (order: Order | null) => {
            set((state) => {
                state.order = order
            })
        }
    }))
)
