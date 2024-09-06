import { confettis, themeSounds } from '@/constants'
import type { Theme } from '@/types/theme'
import { create } from 'zustand'

// Shoot confetti function
const shootConfetti = (theme: Theme) => {
    setTimeout(confettis[theme], 0)
    setTimeout(confettis[theme], 100)
    setTimeout(confettis[theme], 200)
}

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
        themeSounds[newTheme].play()
        shootConfetti(newTheme)
    }

    return {
        theme: storedTheme,
        setTheme,
        initTheme
    }
})

useTheme.getState().initTheme()
