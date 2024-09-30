import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Rating } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getRatings = async ({
    productId
}: {
    productId: string
}): Promise<Rating[]> => {
    const response = await api.get(`/rating/product/${productId}`)
    return response.data
}

export const getSupabaseRatings = async ({
    productId
}: {
    productId: string
}): Promise<Rating[]> => {
    const { data, error } = await supabase
        .from('rating')
        .select('*, user:user_id(id, email, first_name, last_name, role)')
        .eq('product_id', productId)

    if (error) {
        throw new Error(error.message)
    }

    return data?.map((rating) => ({
        ...rating,
        username: `${rating.user.first_name} ${rating.user.last_name}`
    }))
}

export const getRatingsQueryOptions = (productId: string) => ({
    queryKey: ['ratings', productId],
    queryFn: () => getSupabaseRatings({ productId })
})

type UseRatingsOptions = {
    productId: string
    queryConfig?: QueryConfig<typeof getRatings>
}

export const useRatings = ({ productId, queryConfig }: UseRatingsOptions) => {
    return useQuery({
        ...getRatingsQueryOptions(productId),
        ...queryConfig
    })
}
