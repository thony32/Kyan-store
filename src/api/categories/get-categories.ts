import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import type { Category } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/category')
    return response.data
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
