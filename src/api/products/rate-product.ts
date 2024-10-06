import type { MutationConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Rating } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { getRatingsQueryOptions } from './get-ratings'

export const rateProductInputSchema = z.object({
    userId: z.string(),
    productId: z.string(),
    star: z.coerce.number().int().max(5),
    comment: z.string()
})

export type RateProductInput = z.infer<typeof rateProductInputSchema>

function convertToSupabaseRating(product: RateProductInput): {
    id: string
    user_id: string
    product_id: string
    star: number
    comment: string
} {
    return {
        id: uuidv4(),
        user_id: product.userId,
        product_id: product.productId,
        star: product.star,
        comment: product.comment
    }
}

export const rateProduct = async ({
    values
}: {
    values: RateProductInput
}): Promise<Rating> => {
    //FIXME: Tsy mety, mila user_id
    // return api.post("/rating", data);

    // supabase
    const { data, error } = await supabase
        .from('rating')
        .insert({ ...convertToSupabaseRating(values) })
        .select('*, user:user_id(id, email, first_name, last_name, role)')

    if (error) {
        throw new Error(error.message)
    }

    return data?.map((rating) => ({
        ...rating,
        username: `${rating.user.first_name} ${rating.user.last_name}`
    }))[0]
}

type UseRateProductOptions = {
    productId: string
    mutationConfig?: MutationConfig<typeof rateProduct>
}

export const useRateProduct = ({ productId, mutationConfig }: UseRateProductOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getRatingsQueryOptions(productId).queryKey
            })
            toast.success('Avis enregistré avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: rateProduct
    })
}
