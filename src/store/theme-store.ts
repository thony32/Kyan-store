import type { Theme } from '@/types/theme'
import { create } from 'zustand'

export const useTheme = create((set: any, get: any) => {
    const storedTheme = (localStorage.getItem('vite-ui-theme') || 'dark') as Theme

    // Set initial theme and effects
    const initTheme = () => {
        const theme: Theme = get().theme
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }

    // Update theme and side effects
    const setTheme = (newTheme: Theme) => {
        localStorage.setItem('vite-ui-theme', newTheme)
        set({ theme: newTheme })
        initTheme()
    }

    return {
        theme: storedTheme,
        setTheme,
        initTheme
    }
})

useTheme.getState().initTheme()
