import {
  BLACK, BLUE, BLUE_LIGHT, WHITE,
} from './consts'

const isDarkModeEnabled = (): boolean =>
  window?.matchMedia('(prefers-color-scheme: dark)').matches

export const HIGHLIGHT = isDarkModeEnabled() ? BLUE_LIGHT : BLUE
export const FOREGROUND = isDarkModeEnabled() ? WHITE : BLACK
