import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Product } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/product')
    return response.data
}

export const getProductsQueryOptions = () => ({
    queryKey: ['products'],
    queryFn: getProducts
})

type UseProductsOptions = {
    queryConfig?: QueryConfig<typeof getProducts>
}

export const useProducts = ({ queryConfig }: UseProductsOptions) => {
    return useQuery({
        ...getProductsQueryOptions(),
        ...queryConfig
    })
}
