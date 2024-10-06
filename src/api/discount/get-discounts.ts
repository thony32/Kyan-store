import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Discount } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getDiscounts = async (): Promise<Discount[]> => {
    const response = await api.get('/admin/discount')
    return response.data
}

export const getDiscountsQueryOptions = () => ({
    queryKey: ['discount'],
    queryFn: getDiscounts
})

type UseDiscountsOptions = {
    queryConfig?: QueryConfig<typeof getDiscounts>
}

export const useDiscounts = ({ queryConfig }: UseDiscountsOptions) => {
    return useQuery({
        ...getDiscountsQueryOptions(),
        ...queryConfig
    })
}
