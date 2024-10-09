//FIXME: tsy mivadika APPROVED ilay order PENDING
import { getOrderQueryOptions } from '@/api/order/get-order'
import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useOrderStore } from '@/store/order-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const confirmPayment = async ({
    paymentId
}: {
    paymentId?: string
}) => {
    return api.put(`/payment/${paymentId}/confirm`)
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
