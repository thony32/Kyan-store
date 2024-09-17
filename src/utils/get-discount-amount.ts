import type { Product } from '@/types/api'

export default function getDiscountAmount(product: Product): number {
    return Math.ceil((product.price * product.discount.percentage) / 10)
}
