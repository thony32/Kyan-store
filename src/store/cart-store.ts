import type { Product } from '@/types/api'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

// Assuming this function is available
function getDiscountAmount(product: Product): number {
    return Math.ceil((product.price * product.discount.percentage) / 10)
}

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
                    included: true,
                    ratings: [
                        {
                            id: '1',
                            star: 4,
                            comment: 'Test comment',
                            user: {
                                id: '1',
                                email: 'g@gmail.com',
                                firstname: 'Jean',
                                lastname: 'Baptiste',
                                phone: '+261 34 42 509 07',
                                role: 'CLIENT'
                            }
                        }
                    ]
                },
                {
                    id: '12',
                    name: 'Apple 2023 MacBook Air laptop with M2 chip: 38.91cm (15.3 inch) Liquid Retina display. The durable 100% recycled aluminium enclosure is strikingly thin and light.',
                    description:
                        'IMPRESSIVELY BIG, IMPOSSIBLY THIN — The 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display. The durable 100% recycled aluminium enclosure is strikingly thin and light. SUPERCHARGED BY M2 — Get more done faster with a powerful 8-core CPU, 10-core GPU and up to 24GB of unified memory. UP TO 18 HOURS OF BATTERY LIFE — Go all day with the power-efficient performance of the Apple M2 chip. (Battery life varies by use and configuration. See our website for more information.) SPACIOUS, BEAUTIFUL DISPLAY — The high-resolution, 38.91-centimetre (15.3-inch) Liquid Retina display features 500 nits of brightness, P3 wide colour and support for one billion colours for vibrant images and incredible detail. (The display on the 15-inch MacBook Air has rounded corners at the top. When measured as a standard rectangular shape, the screen is 38.91 centimetres (15.3 inches) diagonally (actual viewable area is less.)',
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
                    included: true,
                    ratings: [
                        {
                            id: '1',
                            star: 4,
                            comment: 'Test comment',
                            user: {
                                id: '1',
                                email: 'g@gmail.com',
                                firstname: 'Jean',
                                lastname: 'Baptiste',
                                phone: '+261 34 42 509 07',
                                role: 'CLIENT'
                            }
                        },
                        {
                            id: '2',
                            star: 2,
                            comment:
                                "J'ai testé ce produit et je suis pas très satisfait. La qualité de l'image est très mauvaise. Très difficile à utiliser pour mon âge.",
                            user: {
                                id: '2',
                                email: 'g@gmail.com',
                                firstname: 'Marie',
                                lastname: 'Jeanne',
                                phone: '+261 34 42 509 07',
                                role: 'CLIENT'
                            }
                        },
                        {
                            id: '3',
                            star: 5,
                            comment: 'Je ne suis pas du même avis, le produit est bien',
                            user: {
                                id: '4',
                                email: 'g@gmail.com',
                                firstname: 'Léo',
                                lastname: 'Douma',
                                phone: '+261 34 42 509 07',
                                role: 'CLIENT'
                            }
                        }
                    ]
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
                const items = get().items
                return items.filter((item) => item.included).reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
            },
            getTotalDiscount: () => {
                const items = get().items
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
