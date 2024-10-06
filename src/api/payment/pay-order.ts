import { getOrderQueryOptions } from '@/api/order/get-order'
//FIXME: Miandry fix order
import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import { usePaymentIdStore } from '@/store/payment-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

export const payOrder = async (orderId: string): Promise<string> => {
    // const response = await api.post("/payment", { orderId, paymentMethod: "credit_card" });
    // return response;

    const { data: fetchData, error: fetchError } = await supabase.from('payment').select('*').eq('order_id', orderId).single()

    if (!fetchData) {
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

        return data.id
    }

    if (fetchError) {
        throw new Error(fetchError.message)
    }

    return fetchData.id
}

type UsePayOrderOptions = {
    userId?: string
    mutationConfig?: MutationConfig<typeof payOrder>
}

export const usePayOrder = ({ userId, mutationConfig }: UsePayOrderOptions) => {
    const queryClient = useQueryClient()
    const setPaymentId = usePaymentIdStore.getState().setPaymentId

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(userId).queryKey
            })
            setPaymentId(data)
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
