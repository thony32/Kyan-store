import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { OrderItem } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { getOrderQueryOptions } from './get-order'

type OrderItemInput = {
    orderId: string
    productId: string
    quantity: number
}

export function convertToSupabaseOrderItem(orderItem: OrderItemInput): {
    id: string
    order_id: string
    product_id: string
    quantity: number
} {
    return {
        id: uuidv4(),
        order_id: orderItem.orderId,
        product_id: orderItem.productId,
        quantity: orderItem.quantity
    }
}

export const createOrderItem = async ({
    values
}: {
    values: OrderItemInput
}): Promise<OrderItem> => {
    // return api.post("/order-item", data);

    // supabase
    const { data, error } = await supabase
        .from('order_item')
        .insert({ ...convertToSupabaseOrderItem(values) })
        .select('*')

    if (error) {
        throw new Error(error.message)
    }

    return data[0]
}

type UseCreateOrderItemOptions = {
    userId: string
    mutationConfig?: MutationConfig<typeof createOrderItem>
}

export const useCreateOrderItem = ({ userId, mutationConfig }: UseCreateOrderItemOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(userId).queryKey
            })
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createOrderItem
    })
}
