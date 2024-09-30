import type { User } from '@/types/api'
import { getCookie, removeCookie, setCookie } from 'react-use-cookie'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AuthState {
    token: string | null
    user: User | null
    setAuth: (token: string, user: User) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
    immer((set) => ({
        token: getCookie('jwt'),
        user: getCookie('user') ? JSON.parse(getCookie('user')) : null,
        setAuth: (token: string, user: User) =>
            set((state) => {
                state.token = token
                state.user = user
                setCookie('jwt', token)
                setCookie('user', JSON.stringify(user))
            }),
        clearAuth: () =>
            set((state) => {
                state.token = ''
                state.user = null
                removeCookie('jwt')
                removeCookie('user')
            })
    }))
)
