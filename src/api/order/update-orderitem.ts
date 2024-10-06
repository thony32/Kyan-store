// FIXME: Mile user id
import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import { useOrderStore } from '@/store/order-store'
import type { OrderItem } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getOrderQueryOptions } from './get-order'

type UpdateOrderItemInput = {
    id: string
    orderId: string
    productId: string
    quantity: number
}

export function convertToSupabaseOrder(orderItem: UpdateOrderItemInput): {
    id: string
    order_id: string
    product_id: string
    quantity: number
} {
    return {
        id: orderItem.id,
        order_id: orderItem.orderId,
        product_id: orderItem.productId,
        quantity: orderItem.quantity
    }
}

export const updateOrderItem = async ({
    values
}: {
    values: UpdateOrderItemInput
}): Promise<OrderItem> => {
    // return api.put(`/admin/order-item/${values.id}`, data);

    const { data, error } = await supabase.from('order_item').update(convertToSupabaseOrder(values)).eq('id', values.id).select('*').single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}

type UseUpdateOrderItemOptions = {
    userId?: string
    mutationConfig?: MutationConfig<typeof updateOrderItem>
}

export const useUpdateOrderItem = ({ userId, mutationConfig }: UseUpdateOrderItemOptions) => {
    const queryClient = useQueryClient()
    const oldOrder = useOrderStore.getState().order!
    const setOrder = useOrderStore.getState().setOrder

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(userId).queryKey
            })
            setOrder({
                ...oldOrder,
                order_items: oldOrder.order_items.map((orderItem) => {
                    if (orderItem.id !== data.id) return orderItem
                    return {
                        ...orderItem,
                        quantity: data.quantity
                    }
                })
            })
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        },
        ...restConfig,
        mutationFn: updateOrderItem
    })
}
