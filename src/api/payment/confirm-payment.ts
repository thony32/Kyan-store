import { getOrderQueryOptions } from '@/api/order/get-order'
//FIXME: Miandry fix order
import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import { useOrderStore } from '@/store/order-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const confirmPayment = async ({
    paymentId,
    orderId,
    amount
}: {
    paymentId?: string
    orderId: string
    amount: number
}) => {
    // return api.put(`/payment/${paymentId}/confirm`);

    let supabaseQuery: any

    if (!paymentId) {
        supabaseQuery = supabase
            .from('payment')
            .update({
                is_confirmed: true
            })
            .eq('order_id', orderId)
            .select('*')
            .single()
    } else {
        supabaseQuery = supabase
            .from('payment')
            .update({
                is_confirmed: true
            })
            .eq('id', paymentId)
            .select('*')
            .single()
    }

    const { data, error } = await supabaseQuery

    if (error) {
        throw new Error(error.message)
    }

    const { error: orderError } = await supabase.from('customer_order').update({ status: 'APPROVED', total_amount: amount }).eq('id', data.order_id)

    if (orderError) {
        throw new Error(orderError.message)
    }

    return data
}

type UseConfirmPaymentOptions = {
    userId: string
    mutationConfig?: MutationConfig<typeof confirmPayment>
}

export const useConfirmPayment = ({ userId, mutationConfig }: UseConfirmPaymentOptions) => {
    const queryClient = useQueryClient()
    const setOrder = useOrderStore.getState().setOrder

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(userId).queryKey
            })
            setOrder(null)
            toast.success('Commande payée avec succès')
            onSuccess?.(...args)
            window.location.href = '/cart'
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        },
        ...restConfig,
        mutationKey: ['confirm-payment'],
        mutationFn: confirmPayment
    })
}
