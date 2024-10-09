import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useOrderStore } from '@/store/order-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getOrderQueryOptions } from './get-order'

export const deleteOrderITem = async (orderItem: string): Promise<string> => {
    return await api.delete(`/order-item/${orderItem}`)
}

type UseDeleteOrderItemOptions = {
    userId?: string
    mutationConfig?: MutationConfig<typeof deleteOrderITem>
}

export const useDeleteOrderItem = ({ userId, mutationConfig }: UseDeleteOrderItemOptions) => {
    const queryClient = useQueryClient()
    const oldOrder = useOrderStore.getState().order!
    const setOrder = useOrderStore.getState().setOrder

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            const [data] = args
            queryClient.invalidateQueries({
                queryKey: getOrderQueryOptions(userId).queryKey
            })
            setOrder({
                ...oldOrder,
                order_items: oldOrder.order_items.filter((orderItem) => orderItem.id !== data)
            })
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        },
        ...restConfig,
        mutationFn: deleteOrderITem
    })
}
