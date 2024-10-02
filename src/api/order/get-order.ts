import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Order } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getOrder = async ({
    userId
}: {
    userId?: string
}): Promise<Order[]> => {
    if (!userId) return []
    const response = await api.get(`/order/user/${userId}`)
    return response.data
}

export const getSupabaseOrder = async ({
    userId
}: {
    userId?: string
}): Promise<Order[]> => {
    if (!userId) return []

    const { data, error } = await supabase
        .from('customer_order')
        .select('*, order_items:order_item(*, product:product_id(name, price))')
        .eq('status', 'PENDING')
        .eq('user_id', userId)
        .order('id', { referencedTable: 'order_item', ascending: true })

    if (error) {
        throw new Error(error.message)
    }

    return data.map((order) => ({
        ...order,
        order_items: order.order_items.map((orderItem: any) => ({
            ...orderItem,
            product_name: orderItem.product.name,
            price: orderItem.product.price
        }))
    }))
}

export const getOrderQueryOptions = (userId?: string) => ({
    queryKey: ['order', userId],
    queryFn: () => getSupabaseOrder({ userId })
})

type UseOrderOptions = {
    userId?: string
    queryConfig?: QueryConfig<typeof getOrder>
}

export const useOrder = ({ userId, queryConfig }: UseOrderOptions) => {
    return useQuery({
        ...getOrderQueryOptions(userId),
        ...queryConfig,
        enabled: !!userId
    })
}
