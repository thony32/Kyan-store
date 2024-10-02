import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import { toast } from 'sonner'
import { getOrderQueryOptions } from '@/api/order/get-order'
import { useOrderStore } from '@/store/order-store'

export const confirmPayment = async (paymentId: string) => {
    // return api.put(`/payment/${paymentId}/confirm`);

    const { data, error } = await supabase
        .from('payment')
        .update({
            is_confirmed: true
        })
        .eq('order_id', paymentId)
        .select('*')
        .single()

    if (error) {
        throw new Error(error.message)
    }

    const { error: orderError } = await supabase.from('customer_order').update({ status: 'APPROVED' }).eq('id', data.order_id)

    if (orderError) {
        throw new Error(orderError.message)
    }

    return data
}

type UseConfirmPaymentOptions = {
    userId?: string
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
