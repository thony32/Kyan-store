import { categories } from '@/constants'
import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Category } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getCategories = async (): Promise<Category[]> => {
    // uri temporary so be sure to change it later
    // const response = await api.get('/0a7abff2-e49c-4fd2-9c58-c78d7959f25c')

    // return response.data

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return categories
}

export const getCategoriesQueryOptions = () => ({
    queryKey: ['categories'],
    queryFn: getCategories
})

type UseCategoriesOptions = {
    queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>
}

export const useCategories = ({ queryConfig }: UseCategoriesOptions) => {
    return useQuery({
        ...getCategoriesQueryOptions(),
        ...queryConfig
    })
}
