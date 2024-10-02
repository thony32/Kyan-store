import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import { useAuthStore } from '@/store/auth-store'
import type { Order } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import { getOrderQueryOptions } from './get-order'
import { useOrderStore } from '@/store/order-store'

export function convertToSupabaseOrder({ userId }: { userId: string }): {
    id: string
    order_date: string
    status: string
    total_amount: number
    user_id: string
} {
    return {
        id: uuidv4(),
        order_date: new Date().toISOString(),
        status: 'PENDING',
        total_amount: 0,
        user_id: userId
    }
}

export const createOrder = async ({
    userId
}: {
    userId: string
}): Promise<Order> => {
    // const finalData = {...data, userId}
    // return api.post("/order", data);

    // supabase
    const { data, error } = await supabase
        .from('customer_order')
        .insert({ ...convertToSupabaseOrder({ userId }) })
        .select('*')

    if (error) {
        throw new Error(error.message)
    }

    return data[0]
}

type UseCreateOrderOptions = {
    mutationConfig?: MutationConfig<typeof createOrder>
}

export const useCreateOrder = ({ mutationConfig }: UseCreateOrderOptions) => {
    const queryClient = useQueryClient()
    const setOrder = useOrderStore.getState().setOrder

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(data.user_id).queryKey
            })
            setOrder(data)
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createOrder
    })
}
