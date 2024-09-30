import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Category } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { getCategoriesQueryOptions } from './get-categories'
import { supabase } from '@/libs/supabase-client'
import { toast } from 'sonner'

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

export function convertToSupabaseCategory(category: CreateCategoryInput): {
    id: string
    name: string
    category_id?: string
    is_main_category?: boolean
} {
    if (category.isMainCategory)
        return {
            id: '71fcacca-1d32-4cd7-b953-4b4eaa38a963', // paste a generated UUID
            name: category.name,
            is_main_category: category.isMainCategory
        }
    return {
        id: '0a9da21c-e0be-475f-817c-fef69f36e990', // paste a generated UUID
        name: category.name,
        category_id: category.categoryId
    }
}

export const createCategory = async ({
    values
}: {
    values: CreateCategoryInput
}): Promise<Category> => {
    // if(values.isMainCategory)
    // return api.post("/admin/category", data);
    // else return api.post("/admin/subcategory", data);

    // supabase
    const { data, error } = await supabase
        .from(values.isMainCategory ? 'category' : 'sub_category')
        .insert({ ...convertToSupabaseCategory(values) })
        .select('*')

    if (error) {
        throw new Error(error.message)
    }

    return data[0]
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
