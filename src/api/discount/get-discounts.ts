import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Discount } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getDiscounts = async (): Promise<Discount[]> => {
    const response = await api.get('/admin/discount')
    return response.data
}

export const getSupabaseDiscounts = async (): Promise<Discount[]> => {
    const { data, error } = await supabase.from('discount').select('*')

    if (error) {
        throw error
    }

    return data
}

export const getDiscountsQueryOptions = () => ({
    queryKey: ['discount'],
    queryFn: getSupabaseDiscounts
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
