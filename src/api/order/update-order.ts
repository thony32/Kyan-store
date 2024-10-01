import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Order, Product } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { getOrderQueryOptions } from './get-order'

type UpdateOrderInput = {
    userId: string
    orderItems: {
        id?: string
        orderId: string
        productId: string
        quantity: number
    }[]
}

export function convertToSupabaseOrder(order: UpdateOrderInput): {
    id: string
    order_id: string
    product_id: string
    quantity: number
} {
    return {
        id: uuidv4(),
        order_id: order.orderItems[0].orderId,
        product_id: order.orderItems[0].productId,
        quantity: order.orderItems[0].quantity
    }
}

export const updateOrder = async ({
    values,
    orderId
}: {
    values: UpdateOrderInput
    orderId: string
}): Promise<Order> => {
    // return api.put(`/admin/order/${orderId}`, data);

    // supabase
    if (values.orderItems[0].id) {
        const { data, error } = await supabase.from('order_item').insert(convertToSupabaseOrder(values)).select('*')

        if (error) {
            throw new Error(error.message)
        }

        return data[0]
    }

    const { data, error } = await supabase.from('order_item').delete().eq('id', orderId).select('*')
    if (error) {
        throw new Error(error.message)
    }

    return data[0]
}

type UseUpdateOrderOptions = {
    mutationConfig?: MutationConfig<typeof updateOrder>
}

export const useUpdateOrder = ({ mutationConfig }: UseUpdateOrderOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(data.user_id).queryKey
            })
            toast.success('Commande mise à jour')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: updateOrder
    })
}
