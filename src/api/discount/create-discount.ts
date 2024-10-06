import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Discount } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { getDiscountsQueryOptions } from './get-discounts'

export const createDiscountInputSchema = z.object({
    percentage: z.coerce.number().positive(),
    validUntil: z.string()
})

export type CreateDiscountInput = z.infer<typeof createDiscountInputSchema>

export const defaultValues: CreateDiscountInput = {
    percentage: 0,
    validUntil: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
}

export function convertToSupabaseDiscount(discount: CreateDiscountInput): {
    id: string
    percentage: number
    valid_until: string
} {
    return {
        id: uuidv4(),
        percentage: discount.percentage,
        valid_until: discount.validUntil
    }
}

export const createDiscount = async ({
    values
}: {
    values: CreateDiscountInput
}): Promise<Discount> => {
    return api.post('/admin/discount', values)
}

type UseCreateDiscountOptions = {
    mutationConfig?: MutationConfig<typeof createDiscount>
}

export const useCreateDiscount = ({ mutationConfig }: UseCreateDiscountOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getDiscountsQueryOptions().queryKey
            })
            toast.success('Promotion crée avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: createDiscount
    })
}
