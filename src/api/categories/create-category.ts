import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Category } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'
import { getCategoriesQueryOptions } from './get-categories'

export const createCategoryInputSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    isMainCategory: z.boolean().optional(),
    categoryId: z.string().optional()
})

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>

export const defaultValues: CreateCategoryInput = {
    name: '',
    isMainCategory: true,
    categoryId: ''
}

export const createCategory = async ({
    values
}: {
    values: CreateCategoryInput
}): Promise<Category> => {
    if (values.isMainCategory) return api.post('/admin/category', values)
    return api.post('/admin/subcategory', values)
}

type UseCreateCategoryOptions = {
    mutationConfig?: MutationConfig<typeof createCategory>
}

export const useCreateCategory = ({ mutationConfig }: UseCreateCategoryOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getCategoriesQueryOptions().queryKey
            })
            toast.success('Catégorie crée avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createCategory
    })
}
