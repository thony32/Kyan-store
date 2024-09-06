import { confetti } from '@tsparticles/confetti'
import { Howl } from 'howler'

// NOTE: Theme

const defaults = {
    spread: 90,
    ticks: 100,
    gravity: 1,
    decay: 0.9,
    startVelocity: 40,
    count: 35,
    scalar: 2,
    shapes: ['emoji']
}

export const confettis = {
    light: async () => await confetti({ ...defaults, shapeOptions: { emoji: { value: ['☀️', '🌈', '🌞'] } } }),
    dark: async () => await confetti({ ...defaults, shapeOptions: { emoji: { value: ['🌙', '🌑', '🌘', '🌟'] } } })
}

export const themeSounds = {
    light: new Howl({ src: ['/audio/light-theme-sound.mp3'] }),
    dark: new Howl({ src: ['/audio/light-theme-sound.mp3'] })
}
