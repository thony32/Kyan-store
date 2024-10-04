import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface PaymentIdState {
    paymentId: string | null
    setPaymentId: (paymentId: string) => void
}

export const usePaymentIdStore = create<PaymentIdState>()(
    immer((set) => ({
        paymentId: null,
        setPaymentId: (paymentId: string) => {
            set((state) => {
                state.paymentId = paymentId
            })
        }
    }))
)
