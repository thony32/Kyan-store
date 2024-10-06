import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import type { Discount } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CreateDiscountInput } from './create-discount'
import { getDiscountsQueryOptions } from './get-discounts'

export const updateDiscount = async ({
    values,
    discountId
}: {
    values: CreateDiscountInput
    discountId: string
}): Promise<Discount> => {
    return api.put(`/admin/discount/${discountId}`, values)
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
