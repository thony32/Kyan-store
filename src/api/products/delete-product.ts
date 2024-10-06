import { api } from '@/libs/api-client'
import type { MutationConfig } from '@/libs/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getProductsQueryOptions } from './get-products'

export const deleteProduct = async ({ productId }: { productId: string }) => {
    return api.delete(`admin/product/${productId}`)
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
            toast.success('Produit supprimé avec succès')
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: deleteProduct
    })
}
