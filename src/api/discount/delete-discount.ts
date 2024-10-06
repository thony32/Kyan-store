import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getDiscountsQueryOptions } from './get-discounts'

export const deleteDiscount = async ({
    discountId
}: {
    discountId: string
}) => {
    return api.delete(`admin/discount/${discountId}`)
}

type UseDeleteDiscountOptions = {
    mutationConfig?: MutationConfig<typeof deleteDiscount>
}

export const useDeleteDiscount = ({ mutationConfig }: UseDeleteDiscountOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getDiscountsQueryOptions().queryKey
            })
            toast.success('Promotion supprimée avec succès')
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: deleteDiscount
    })
}
