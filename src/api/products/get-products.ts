import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Product } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/product')
    return response.data
}

export const getSupabaseProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('product')
        .select('*, category:category_id(name), subcategory:subcategory_id(name), ratings:rating(*), image(*), discount(*)')

    if (error) {
        throw new Error(error.message)
    }

    return data.map((product) => ({
        ...product,
        quantity: product.stock_quantity,
        category_name: product.category.name,
        subcategory_name: product.subcategory ? product.subcategory.name : null,
        discount_id: product.discount?.id,
        discount_percentage: product.discount?.percentage,
        discount_validity: product.discount?.validity,
        image_id: product.image?.id,
        image_url: product.image?.url
    }))
}

export const getProductsQueryOptions = () => ({
    queryKey: ['products'],
    queryFn: getSupabaseProducts
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
