import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Category } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import type { CreateCategoryInput } from './create-category'
import { getCategoriesQueryOptions } from './get-categories'
import { toast } from 'sonner'

export function convertToSupabaseCategory(category: CreateCategoryInput): {
    name: string
    category_id?: string
    is_main_category?: boolean
} {
    if (category.isMainCategory)
        return {
            name: category.name,
            is_main_category: category.isMainCategory
        }
    return {
        name: category.name,
        category_id: category.categoryId
    }
}

export const updateCategory = async ({
    values,
    categoryId
}: {
    values: CreateCategoryInput
    categoryId: string
}): Promise<Category> => {
    // if(values.isMainCategory)
    // return api.put(`/admin/category/${categoryId}`, data);
    // else return api.put(`/admin/subcategory/${categoryId}`, data);

    // supabase
    const { data, error } = await supabase
        .from(values.isMainCategory ? 'category' : 'sub_category')
        .update({ ...convertToSupabaseCategory(values) })
        .eq('id', categoryId)
        .select('*')

    if (error) {
        throw new Error(error.message)
    }

    return data[0]
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
