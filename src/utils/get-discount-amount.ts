import type { Product } from '@/types/api'

export default function getDiscountAmount(product: Product): number {
    if (product.discount_percentage) return Math.ceil((product.price * product.discount_percentage) / 10)
    return 0
}
