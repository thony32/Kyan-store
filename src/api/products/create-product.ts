import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Product } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { getProductsQueryOptions } from './get-products'

export const createProductInputSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    description: z.string().min(1, 'La description est requise'),
    price: z.coerce.number().min(0, 'Le prix doit être positif'),
    stockQuantity: z.coerce.number().min(0, 'La quantité doit être positive'),
    brand: z.string().min(1, 'La marque est requise'),
    model: z.string().min(1, 'Le modèle est requis'),
    categoryId: z.string().min(1, 'La catégorie est requise'),
    subcategoryId: z.string().min(1, 'La sous-catégorie est requise'),
    discountId: z.string().min(1, 'La réduction est requise').optional()
})

export type CreateProductInput = z.infer<typeof createProductInputSchema>

export const createProduct = ({
    data
}: {
    data: CreateProductInput
}): Promise<Product> => {
    return api.post('/admin/product', data)
}

type UseCreateProductOptions = {
    mutationConfig?: MutationConfig<typeof createProduct>
}

export const useCreateProduct = ({ mutationConfig }: UseCreateProductOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getProductsQueryOptions().queryKey
            })
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: createProduct
    })
}
