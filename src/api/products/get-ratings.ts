import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
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

export const getRatingsQueryOptions = (productId: string) => ({
    queryKey: ['ratings', productId],
    queryFn: () => getRatings({ productId })
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
