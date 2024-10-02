import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import { getOrderQueryOptions } from './get-order'
import { useOrderStore } from '@/store/order-store'
import { toast } from 'sonner'

export const deleteOrderITem = async (orderItem: string): Promise<string> => {
    // return api.delete(`/admin/order-item/${values.id}`);
    // if response return orderItem

    const { error } = await supabase.from('order_item').delete().eq('id', orderItem)

    if (error) {
        throw new Error(error.message)
    }

    return orderItem
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
