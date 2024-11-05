import { api } from '@/libs/api-client'
import { useQuery } from '@tanstack/react-query'

export const getUsers = async () => {
    const response = await api.get('/admin/customer')
    return response.data
}

export const getOrderQueryOptions = () => ({
    queryKey: ['_user'],
    queryFn: getUsers
})

export const useAllUsers = () => {
    return useQuery({
        ...getOrderQueryOptions()
    })
}
