import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useOrderStore } from '@/store/order-store'
import type { Order } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { getOrderQueryOptions } from './get-order'

// TODO: We don't need the orderId while using the api

type CreateUpdateOrderInput = {
    userId: string
    orderItems: {
        orderId?: string
        productId: string
        quantity: number
    }[]
}

export function convertToSupabaseOrder(order: CreateUpdateOrderInput): {
    id: string
    order_id?: string
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

export const createUpdateOrder = async ({
    values
}: {
    values: CreateUpdateOrderInput
}): Promise<Order[]> => {
    const data = await api.post('/order/create-or-update', values)

    const transformOrderData = (data: any): Order => ({
        ...data,
        order_items: data.order_items.map((item: any) => ({
            ...item,
            product_name: item.product_name,
            price: item.product_price
        }))
    })
    return [transformOrderData(data)]
}

type UseCreateUpdateOrderOptions = {
    userId: string
    mutationConfig?: MutationConfig<typeof createUpdateOrder>
}

export const useCreateUpdateOrder = ({ userId, mutationConfig }: UseCreateUpdateOrderOptions) => {
    const queryClient = useQueryClient()
    const setOrder = useOrderStore.getState().setOrder

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(userId).queryKey
            })
            setOrder(data[0])
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createUpdateOrder
    })
}
