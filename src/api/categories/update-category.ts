import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Category } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CreateCategoryInput } from './create-category'
import { getCategoriesQueryOptions } from './get-categories'

export const updateCategory = async ({
    values,
    categoryId
}: {
    values: CreateCategoryInput
    categoryId: string
}): Promise<Category> => {
    if (values.isMainCategory) return api.put(`/admin/category/${categoryId}`, values)
    return api.put(`/admin/subcategory/${categoryId}`, values)
}

type UseUpdateCategoryOptions = {
    mutationConfig?: MutationConfig<typeof updateCategory>
}

export const useUpdateCategory = ({ mutationConfig }: UseUpdateCategoryOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getCategoriesQueryOptions().queryKey
            })
            toast.success('Catégorie modifiée avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: updateCategory
    })
}
