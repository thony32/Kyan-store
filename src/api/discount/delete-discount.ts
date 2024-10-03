import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDiscountsQueryOptions } from './get-discounts'
import { supabase } from '@/libs/supabase-client'
import { toast } from 'sonner'

export const deleteDiscount = async ({
    discountId
}: {
    discountId: string
}) => {
    // return api.delete(`admin/discount/${discountId}`);

    // supabase
    return await supabase.from('discount').delete().eq('id', discountId)
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
