import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Order } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { getOrderQueryOptions } from './get-order'
import { useOrderStore } from '@/store/order-store'

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
    // const data = await api.post("/order/create-or-udate", data);
    // return [data];

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

    if (!values.orderItems[0].orderId) {
        supabaseQuery = supabase
            .from('customer_order')
            .insert({
                id: uuidv4(),
                order_date: new Date().toISOString(),
                status: 'PENDING',
                total_amount: 0,
                user_id: values.userId
            })
            .select('*')
            .single()
    } else {
        supabaseQuery = supabase.from('customer_order').select('*').eq('id', values.orderItems[0].orderId).single()
    }

    const { data: fetchedData, error: fetchedError } = await supabaseQuery

    if (fetchedError) throw new Error(fetchedError.message)

    const { data, error } = await supabase
        .from('order_item')
        .insert({ ...convertToSupabaseOrder(values), order_id: fetchedData.id })
        .select('order:customer_order(*, order_items:order_item(*, product:product_id(name, price)))')
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return handleResponse(data)
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
            toast.success('Commande mise à jour')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createUpdateOrder
    })
}
