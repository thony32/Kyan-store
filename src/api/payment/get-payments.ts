import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Payment } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getPayments = async (): Promise<Payment[]> => {
    const response = await api.get('/admin/payment')
    return response.data
}

export const getPaymentsQueryOptions = () => ({
    queryKey: ['payments'],
    queryFn: () => getPayments()
})

type UsePaymentsOptions = {
    queryConfig?: QueryConfig<typeof getPayments>
}

export const usePayments = ({ queryConfig }: UsePaymentsOptions) => {
    return useQuery({
        ...getPaymentsQueryOptions(),
        ...queryConfig
    })
}
