import { api } from '@/libs/api-client'
import type { QueryConfig } from '@/libs/react-query'
import { supabase } from '@/libs/supabase-client'
import type { Payment } from '@/types/api'
import { useQuery } from '@tanstack/react-query'

export const getPayments = async (): Promise<Payment[]> => {
    const response = await api.get('/payment')
    return response.data
}

export const getSupabasePayments = async (): Promise<Payment[]> => {
    const { data, error } = await supabase.from('payment').select('*, order:order_id(*, order_items:order_item(*, product:product_id(name, price)))')

    if (error) {
        throw new Error(error.message)
    }

    return data.map((payment) => ({
        ...payment,
        payment_id: payment.id,
        order: {
            ...payment.order,
            order_items: payment.order.order_items.map((orderItem: any) => ({
                ...orderItem,
                product_name: orderItem.product.name,
                price: orderItem.product.price
            }))
        }
    }))
}

export const getPaymentsQueryOptions = () => ({
    queryKey: ['payments'],
    queryFn: () => getSupabasePayments()
})

type UsePaymentsOptions = {
    queryConfig?: QueryConfig<typeof getPayments>
}

export const usePayments = ({ queryConfig }: UsePaymentsOptions) => {
    return useQuery({
        ...getPaymentsQueryOptions(),
        ...queryConfig
    })
}
