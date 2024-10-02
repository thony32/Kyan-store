import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Order, Product } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { getOrderQueryOptions } from './get-order'
import { useOrderStore } from '@/store/order-store'

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
}): Promise<Order[]> => {
    // return api.put(`/admin/order/${orderId}`, data);

    // supabase
    const transformOrderData = (data: any): Order => ({
        ...data,
        order_items: data.order_items.map((item: any) => ({
            ...item,
            product_name: item.product.name,
            price: item.product.price
        }))
    })

    const handleResponse = (data: any): Order[] => {
        if (data?.order) {
            const order = transformOrderData(data.order)
            return [order]
        }
        return []
    }

    let supabaseQuery: any

    if (!values.orderItems[0].id) {
        supabaseQuery = supabase
            .from('order_item')
            .insert(convertToSupabaseOrder(values))
            .select('order:customer_order(*, order_items:order_item(*, product:product_id(name, price)))')
            .single()
    } else {
        supabaseQuery = supabase
            .from('order_item')
            .delete()
            .eq('id', values.orderItems[0].id)
            .select('order:customer_order(*, order_items:order_item(*, product:product_id(name, price)))')
            .single()
    }

    const { data, error } = await supabaseQuery

    if (error) {
        throw new Error(error.message)
    }

    return handleResponse(data)
}

type UseUpdateOrderOptions = {
    mutationConfig?: MutationConfig<typeof updateOrder>
}

export const useUpdateOrder = ({ mutationConfig }: UseUpdateOrderOptions) => {
    const queryClient = useQueryClient()
    const setOrder = useOrderStore.getState().setOrder

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(data[0].user_id).queryKey
            })
            setOrder(data[0])
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
