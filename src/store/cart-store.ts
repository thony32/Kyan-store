import type { Product } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

// Assuming this function is available
function getDiscountAmount(product: Product): number {
    if (product.discount_percentage) return Math.ceil((product.price * product.discount_percentage) / 10)
    return 0
}

type Item = {
    orderQuantity: number
    included: boolean
} & Product

interface CartState {
    items: Item[]
    increment: (product: Product) => void
    decrement: (product: Product) => void
    include: (product: Product) => void
    addItem: (product: Product) => void
    removeItem: (product: Product) => void
    getTotal: () => number
    getTotalDiscount: () => number
    getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        immer((set, get) => ({
            items: [],
            addItem: (product: Product) => {
                set((state) => {
                    state.items.push({ ...product, orderQuantity: 1, included: true })
                })
            },
            removeItem: (product: Product) => {
                set((state) => {
                    state.items = state.items.filter((p) => p.id !== product.id)
                })
            },
            increment: (product: Product) => {
                set((state) => {
                    const item = state.items.find((item) => item.id === product.id)
                    if (item && item.orderQuantity < item.quantity) {
                        item.orderQuantity += 1
                    }
                })
            },
            decrement: (product: Product) => {
                set((state) => {
                    const item = state.items.find((item) => item.id === product.id)
                    if (item && item.orderQuantity > 1) {
                        item.orderQuantity -= 1
                    }
                })
            },
            include: (product: Product) => {
                set((state) => {
                    const item = state.items.find((item) => item.id === product.id)
                    if (item) {
                        item.included = !item.included
                    }
                })
            },
            getTotal: () => {
                const items = get().items
                return items.filter((item) => item.included).reduce((subtotal, item) => subtotal + item.price * item.orderQuantity, 0)
            },
            getTotalDiscount: () => {
                const items = get().items
                return items
                    .filter((item) => item.included)
                    .reduce((totalDiscount, item) => totalDiscount + getDiscountAmount(item) * item.orderQuantity, 0)
            },
            getSubtotal: () => {
                const { getTotal, getTotalDiscount } = get()
                return getTotal() - getTotalDiscount()
            }
        })),
        {
            name: 'items'
        }
    )
)
