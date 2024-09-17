import type { Product } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import getDiscountAmount from '@/utils/get-discount-amount'

type Item = {
    quantity: number
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
            items: [
                {
                    id: '1',
                    name: 'Samsung Galaxy S22 Ultra 5G (Burgundy, 12GB, 256GB Storage)',
                    description:
                        'The first Galaxy S with embedded S Pen. Write comfortably like pen on paper, turn quick notes into legible text and use Air Actions to control your phone remotely.',
                    price: 1147,
                    stock: 30,
                    brand: 'Samsung',
                    model: 'SAMSUNG GALAXY S22 ULTRA 5G',
                    category_id: '1',
                    category_name: 'Smartphones',
                    subcategory_id: '1-1',
                    images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074776147-galaxy%20S22%20ultra%205G.jpg'],
                    subcategory_name: 'Flagship Phones',
                    discount: {
                        id: '1',
                        percentage: 2.9,
                        valid_until: new Date('2024-10-20')
                    },
                    quantity: 1,
                    included: true
                },
                {
                    id: '2',
                    name: 'Apple 2023 MacBook Air laptop with M2 chip: 38.91cm (15.3 inch) Liquid Retina display, 8GB RAM 512GB SSD storage, backlit keyboard, 1080p FaceTime HD camera,Touch ID Works with iPhone/iPad; Space Gray',
                    description:
                        'IMPRESSIVELY BIG, IMPOSSIBLY THIN — The 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display. The durable 100% recycled aluminium enclosure is strikingly thin and light. SUPERCHARGED BY M2 — Get more done faster with a powerful 8-core CPU, 10-core GPU and up to 24GB of unified memory',
                    price: 1753,
                    stock: 20,
                    brand: 'Apple',
                    model: 'MacBook Pro',
                    category_id: '2',
                    category_name: 'Laptops',
                    subcategory_id: '2-1',
                    images: ['https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694247795300-81xW62KXNhL._SL1500_.jpg'],
                    subcategory_name: 'Ultrabooks',
                    discount: {
                        id: '1',
                        percentage: 0.9,
                        valid_until: new Date('2024-10-20')
                    },
                    quantity: 1,
                    included: true
                }
            ],
            addItem: (product: Product) => {
                set((state) => {
                    state.items.push({ ...product, quantity: 1, included: true })
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
                    if (item && item.quantity < item.stock) {
                        item.quantity += 1
                    }
                })
            },
            decrement: (product: Product) => {
                set((state) => {
                    const item = state.items.find((item) => item.id === product.id)
                    if (item && item.quantity > 1) {
                        item.quantity -= 1
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
                const { items } = get()
                return items.filter((item) => item.included).reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
            },
            getTotalDiscount: () => {
                const { items } = get()
                return items
                    .filter((item) => item.included)
                    .reduce((totalDiscount, item) => totalDiscount + getDiscountAmount(item) * item.quantity, 0)
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
