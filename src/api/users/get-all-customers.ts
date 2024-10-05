import { supabase } from '@/libs/supabase-client'
import { useQuery } from '@tanstack/react-query'

export const getSupabaseUser = async () => {
    const { data, error } = await supabase.from('_user').select('*').eq('role', 'CUSTOMER')

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export const getOrderQueryOptions = () => ({
    queryKey: ['_user'],
    queryFn: getSupabaseUser
})

export const useAllUsers = () => {
    return useQuery({
        ...getOrderQueryOptions()
    })
}
