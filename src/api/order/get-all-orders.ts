import { api } from '@/libs/api-client'
import type { Order } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getAllApprovedOrders = async (): Promise<Order[]> => {
    const response = await api.get('/admin/order')
    const filteredData = response.data.filter((order: Order) => order.status !== 'PENDING')
    return filteredData
}

export const getOrderQueryOptions = () => ({
    queryKey: ['orders'],
    queryFn: getAllApprovedOrders
})

export const useAllOrders = () => {
    return useQuery({
        ...getOrderQueryOptions()
    })
}
