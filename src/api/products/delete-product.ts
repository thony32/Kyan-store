import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getProductsQueryOptions } from './get-products'
import { supabase } from '@/libs/supabase-client'

export const deleteProduct = async ({ productId }: { productId: string }) => {
    // return api.delete(`admin/product/${productId}`);
    return await supabase.from('product').delete().eq('id', productId)
}

type UseDeleteProductOptions = {
    mutationConfig?: MutationConfig<typeof deleteProduct>
}

export const useDeleteProduct = ({ mutationConfig }: UseDeleteProductOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getProductsQueryOptions().queryKey
            })
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: deleteProduct
    })
}
