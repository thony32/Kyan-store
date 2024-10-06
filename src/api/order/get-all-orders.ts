//FIXME: Mila endpoint
import { supabase } from '@/libs/supabase-client'
import type { Order } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getSupabaseOrders = async (): Promise<Order[]> => {
    const { data, error } = await supabase.from('customer_order').select('*').eq('status', 'APPROVED')

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const getOrderQueryOptions = () => ({
    queryKey: ['order'],
    queryFn: getSupabaseOrders
})

export const useAllOrders = () => {
    return useQuery({
        ...getOrderQueryOptions()
    })
}
