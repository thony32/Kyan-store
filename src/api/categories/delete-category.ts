import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getCategoriesQueryOptions } from './get-categories'

export const deleteCategory = async ({
    categoryId,
    isMainCategory
}: {
    categoryId: string
    isMainCategory: boolean
}) => {
    if (isMainCategory) return api.delete(`/admin/category/${categoryId}`)
    return api.delete(`/admin/subcategory/${categoryId}`)
}

type UseDeleteCategoryOptions = {
    mutationConfig?: MutationConfig<typeof deleteCategory>
}

export const useDeleteCategory = ({ mutationConfig }: UseDeleteCategoryOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getCategoriesQueryOptions().queryKey
            })
            toast.success('Catégorie supprimée avec succès')
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: deleteCategory
    })
}
