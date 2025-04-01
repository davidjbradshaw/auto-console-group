import {
  BLACK, BLUE, BLUE_LIGHT, WHITE,
} from './consts'

const isDarkModeEnabled = (): boolean =>
  typeof window === 'undefined' || typeof window.matchMedia !== 'function'
    ? false
    : window.matchMedia('(prefers-color-scheme: dark)').matches

export const HIGHLIGHT = isDarkModeEnabled() ? BLUE_LIGHT : BLUE
export const FOREGROUND = isDarkModeEnabled() ? WHITE : BLACK
