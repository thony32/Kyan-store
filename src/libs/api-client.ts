import Axios, { type InternalAxiosRequestConfig } from 'axios'
// Importing Axios and the type for Axios request configuration

import { useAuthDialogStore } from '@/store/auth-dialog-store'
// Importing a custom store for managing authentication dialog state

import { toast } from 'sonner'
// Importing a toast notification library

// Function to intercept and modify outgoing requests
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = 'application/json'
        // Ensure the request accepts JSON responses
    }

    config.withCredentials = true
    // Include credentials (such as cookies) in requests
    return config
}

const API_URL = import.meta.env.VITE_API_URL as string

// Create an Axios instance with a base URL from environment variables
export const api = Axios.create({
    baseURL: API_URL
})

// Add the request interceptor to the Axios instance
api.interceptors.request.use(authRequestInterceptor)

// Add a response interceptor to handle responses and errors
api.interceptors.response.use(
    (response) => {
        // Simply return the response if successful
        return response
    },
    (error) => {
        // Extract the error message from the response or use a generic message
        const message = error.response?.data?.message || error.message
        // Show an error toast notification with the message
        toast.error('Une erreur est survenue', {
            description: message
        })

        // Get the function to open the authentication dialog from the store
        const setShouldOpen = useAuthDialogStore.getState().setShouldOpen

        // If the error status is 401 (Unauthorized), open the authentication dialog
        if (error.response?.status === 401) {
            setShouldOpen(true)
        }

        // Reject the promise with the error to propagate it
        return Promise.reject(error)
    }
)
