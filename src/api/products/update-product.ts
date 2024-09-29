import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Product } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getProductsQueryOptions } from './get-products'
import { supabase } from '@/libs/supabase-client'
import type { CreateProductInput } from './create-product'

function convertToSupabaseProduct(product: CreateProductInput): {
    name: string
    description: string
    price: number
    stock_quantity: number
    brand: string
    model: string
    category_id: string
    subcategory_id: string | null
    discount_id: string | null
    is_available: boolean
} {
    return {
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        model: product.model,
        is_available: true,
        stock_quantity: product.stockQuantity,
        category_id: product.categoryId,
        subcategory_id: product.subCategoryId || null,
        discount_id: product.discountId || null
    }
}

export const updateProduct = async ({
    values,
    productId
}: {
    values: CreateProductInput
    productId: string
}): Promise<Product> => {
    // return api.put(`/admin/product/${productId}`, data);

    // supabase
    const { data, error } = await supabase
        .from('product')
        .update({ ...convertToSupabaseProduct(values) })
        .eq('id', productId)
        .select('*, category:category_id(name), subcategory:subcategory_id(name), ratings:rating(*), image(*), discount(*)')

    if (error) {
        throw new Error(error.message)
    }

    return data?.map((product) => ({
        ...product,
        quantity: product.stock_quantity,
        category_name: product.category.name,
        subcategory_name: product.subcategory ? product.subcategory.name : null,
        discount_id: product.discount?.id,
        discount_percentage: product.discount?.percentage,
        discount_validity: product.discount?.validity,
        image_id: product.image?.id,
        image_url: product.image?.url,
        is_available: true
    }))[0]
}

type UseUpdateProductOptions = {
    mutationConfig?: MutationConfig<typeof updateProduct>
}

export const useUpdateProduct = ({ mutationConfig }: UseUpdateProductOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getProductsQueryOptions().queryKey
            })
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: updateProduct
    })
}
