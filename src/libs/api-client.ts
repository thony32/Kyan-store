import Axios, { type InternalAxiosRequestConfig } from 'axios'

import { toast } from 'sonner'
import { useAuthDialogStore } from '@/store/auth-dialog-store'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = 'application/json'
    }

    config.withCredentials = true
    return config
}

export const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL as string
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const message = error.response?.data?.message || error.message
        toast.error('Une erreur est survenue', {
            description: message
        })

        const setShouldOpen = useAuthDialogStore.getState().setShouldOpen

        if (error.response?.status === 401) {
            setShouldOpen(true)
        }

        return Promise.reject(error)
    }
)
