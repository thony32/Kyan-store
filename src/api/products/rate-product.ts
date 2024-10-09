import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Rating } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'
import { getRatingsQueryOptions } from './get-ratings'

export const rateProductInputSchema = z.object({
    userId: z.string(),
    productId: z.string(),
    star: z.coerce.number().int().max(5),
    comment: z.string()
})

export type RateProductInput = z.infer<typeof rateProductInputSchema>

export const rateProduct = async ({
    values
}: {
    values: RateProductInput
}): Promise<Rating> => {
    const response = await api.post('/rating', values)
    return response.data
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
