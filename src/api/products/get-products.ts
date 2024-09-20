import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Product } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { products } from '@/constants'

export const getProducts = async (): Promise<Product[]> => {
    // uri temporary so be sure to change it later
    // const response = await api.get('/f05794ca-ac9d-47ef-ac4c-b45d5fb5b00c')

    // return response.data

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return products
}

export const getProductsQueryOptions = () => ({
    queryKey: ['products'],
    queryFn: getProducts
})

type UseProductsOptions = {
    queryConfig?: QueryConfig<typeof getProductsQueryOptions>
}

export const useProducts = ({ queryConfig }: UseProductsOptions) => {
    return useQuery({
        ...getProductsQueryOptions(),
        ...queryConfig
    })
}
