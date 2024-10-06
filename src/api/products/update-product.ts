import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Product } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CreateProductInput } from './create-product'
import { getProductsQueryOptions } from './get-products'

export const updateProduct = async ({
    values,
    productId
}: {
    values: CreateProductInput
    productId: string
}): Promise<Product> => {
    return api.put(`/admin/product/${productId}`, values)
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
            toast.success('Product modifié avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: updateProduct
    })
}
