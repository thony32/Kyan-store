import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Discount } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/libs/supabase-client'
import type { CreateDiscountInput } from './create-discount'
import { getDiscountsQueryOptions } from './get-discounts'
import { toast } from 'sonner'

export function convertToSupabaseDiscount(discount: CreateDiscountInput): {
    name: string
    percentage: number
    valid_until: string
} {
    return {
        percentage: discount.percentage,
        valid_until: discount.validUntil
    }
}

export const updateDiscount = async ({
    values,
    discountId
}: {
    values: CreateDiscountInput
    discountId: string
}): Promise<Discount> => {
    // return api.put(`/admin/discount/${discountId}`, data);

    // supabase
    const { data, error } = await supabase
        .from('discount')
        .update({ ...convertToSupabaseDiscount(values) })
        .eq('id', discountId)
        .select('*')
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return data
}

type UseUpdateDiscountOptions = {
    mutationConfig?: MutationConfig<typeof updateDiscount>
}

export const useUpdateDiscount = ({ mutationConfig }: UseUpdateDiscountOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getDiscountsQueryOptions().queryKey
            })
            toast.success('Promotion modifiée avec succès')
            onSuccess?.(...args)
        },
        onError: (error) => {
            console.error(error)
        },
        ...restConfig,
        mutationFn: updateDiscount
    })
}
