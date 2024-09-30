import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Product } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { getProductsQueryOptions } from './get-products'

export const createProductInputSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    description: z.string().min(1, 'La description est requise'),
    price: z.coerce.number().min(0, 'Le prix doit être positif'),
    stockQuantity: z.coerce.number().min(0, 'La quantité doit être positive'),
    isAvailable: z.boolean().default(true),
    brand: z.string().min(1, 'La marque est requise'),
    model: z.string().min(1, 'Le modèle est requis'),
    categoryId: z.string().min(1, 'La catégorie est requise'),
    imageUrl: z.string().min(1, "L'image est requise"),
    subCategoryId: z.string().min(1, 'La sous-catégorie est requise').optional(),
    discountId: z.string().min(1, 'La réduction est requise').optional()
})

export type CreateProductInput = z.infer<typeof createProductInputSchema>

export const defaultValues: CreateProductInput = {
    name: '',
    description: '',
    imageUrl: '',
    stockQuantity: 0,
    price: 0,
    brand: '',
    model: '',
    categoryId: '',
    subCategoryId: '',
    discountId: '',
    isAvailable: true
}

function convertToSupabaseProduct(product: CreateProductInput): {
    id: string
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
        id: uuidv4(), // paste a genereted uuid
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

export const createProduct = async ({
    values
}: {
    values: CreateProductInput
}): Promise<Product> => {
    // return api.post("/admin/product", data);

    // supabase
    const { data, error } = await supabase
        .from('product')
        .insert({ ...convertToSupabaseProduct(values) })
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
            toast.success('Produit créé avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createProduct
    })
}
