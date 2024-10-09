import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Order } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getOrder = async ({
    userId
}: {
    userId?: string
}): Promise<Order[]> => {
    if (!userId) return []
    const response = await api.get(`/order/user/${userId}`)
    return response.data
}

export const getOrderQueryOptions = (userId?: string) => ({
    queryKey: ['order', userId],
    queryFn: () => getOrder({ userId })
})

type UseOrderOptions = {
    userId?: string
    queryConfig?: QueryConfig<typeof getOrder>
}

export const useOrder = ({ userId, queryConfig }: UseOrderOptions) => {
    return useQuery({
        ...getOrderQueryOptions(userId),
        ...queryConfig,
        enabled: !!userId
    })
}
