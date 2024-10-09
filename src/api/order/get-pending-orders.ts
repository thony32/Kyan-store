import { api } from '@/libs/api-client'
import type { Order } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getPendingOrders = async (): Promise<Order[]> => {
    const response = await api.get('/admin/order/status?status=PENDING')
    return response.data
}

export const getOrderQueryOptions = () => ({
    queryKey: ['pendingOrder'],
    queryFn: getPendingOrders
})

export const useAllPendingOrders = () => {
    return useQuery({
        ...getOrderQueryOptions()
    })
}
