import { useMemo } from 'react'
import type { OrderItem, Product } from '@/types/api'
import getDiscountAmount from './get-discount-amount'

export function useOrderUtils(orderItems?: OrderItem[], products?: Product[]) {
    const getTotal = useMemo(() => {
        if (!orderItems) return 0
        return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }, [orderItems])

    const getTotalDiscount = useMemo(() => {
        if (!orderItems || !products) return 0

        return orderItems.reduce((totalDiscount, item) => {
            const product = products.find((p) => p.id === item.product_id)!
            return totalDiscount + getDiscountAmount(product) * item.quantity
        }, 0)
    }, [orderItems, products])

    const getSubtotal = useMemo(() => getTotal - getTotalDiscount, [getTotal, getTotalDiscount])

    return { getTotal, getTotalDiscount, getSubtotal }
}
