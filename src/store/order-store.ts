import type { Order } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface OrderState {
    order: Order | undefined
    setOpen: (order: Order | undefined) => void
}

export const useOrderStore = create<OrderState>()(
    immer((set) => ({
        order: undefined,
        setOpen: (order: Order | undefined) => {
            set((state) => {
                state.order = order
            })
        }
    }))
)
