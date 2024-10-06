import { api } from '@/libs/api-client'
import { useAuthDialogStore } from '@/store/auth-dialog-store'
import { type UserAuth, useAuthStore } from '@/store/auth-store'
import type { AuthResponse } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

// NOTE: Mety
export const loginInput = z.object({
    email: z.string().email("L'adresse email est invalide"),
    password: z.string().min(4, 'Le mot de passe doit contenir au moins 4 caractères').max(255)
})

export type LoginInput = z.infer<typeof loginInput>

export const registerInput = z.object({
    firstname: z.string().min(1, 'Le prénom est requis'),
    lastname: z.string().min(1, 'Le nom est requis'),
    email: z.string().email("L'adresse email est invalide"),
    password: z.string().min(1, 'Le mot de passe est obligatoire').max(255),
    role: z.enum(['CUSTOMER', 'ADMIN'])
})

export type RegisterInput = z.infer<typeof registerInput>

const login = async (credentials: LoginInput): Promise<AuthResponse> => {
    const response = await api.post('/auth/authenticate', credentials)
    return response.data
}

const register = async (credentials: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', credentials)
    return response.data
}

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout')
        return response
    } catch (error) {
        throw new Error('Une erreur est survenue')
    }
}

const setAuth = useAuthStore.getState().setAuth
const setShouldOpen = useAuthDialogStore.getState().setShouldOpen
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess: (data: AuthResponse) => {
            const user: UserAuth = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role
            }
            setAuth(data.access_token, user)
            toast.success('Connecté avec succès!')
            setShouldOpen(false)
        },
        onError: (error) => {
            console.error(error)
            toast.error("Erreur d'authentification, veuillez reessayer !")
        }
    })
}

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: register,
        mutationKey: ['register'],
        onSuccess: (data: AuthResponse) => {
            const user: UserAuth = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role
            }
            setAuth(data.access_token, user)
            toast.success('Inscription réussie!')
            setShouldOpen(false)
        },
        onError: (error) => {
            console.error(error)
            toast.error("Erreur lors de l'inscription, veuillez reessayer !")
        }
    })
}

const clearAuth = useAuthStore.getState().clearAuth
export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: logout,
        mutationKey: ['logout'],
        onSuccess: () => {
            toast.success('Deconnecté avec succès!')
            clearAuth()
        },
        onError: (error) => {
            console.error(error)
            toast.error('Une erreur est survenue, veuillez reessayer')
        }
    })
}
