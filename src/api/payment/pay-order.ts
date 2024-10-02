import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { getOrderQueryOptions } from '@/api/order/get-order'

export const payOrder = async (orderId: string) => {
    // return api.post("/payment", { orderId, paymentMethod: "credit_card" });

    const { data, error } = await supabase
        .from('payment')
        .insert({
            id: uuidv4(),
            order_id: orderId,
            is_confirmed: false,
            payment_method: 'credit_card'
        })
        .select('*')
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}

type UsePayOrderOptions = {
    userId?: string
    mutationConfig?: MutationConfig<typeof payOrder>
}

export const usePayOrder = ({ userId, mutationConfig }: UsePayOrderOptions) => {
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
            console.log(error)
            toast.error(error.message)
        },
        ...restConfig,
        mutationFn: payOrder
    })
}
