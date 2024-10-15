import { getOrderQueryOptions } from '@/api/order/get-order'
import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { usePaymentIdStore } from '@/store/payment-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const payOrder = async (orderId: string): Promise<string> => {
    const response = await api.post('/payment', { orderId, paymentMethod: 'credit_card' })
    return response.data.payment_id
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
