import { writable, readable, derived } from 'svelte/store'

export const playing = writable(false)
export const recording = writable(false)
export const video = writable(null)
export const bgImage = writable('')
export const logoImage = writable('')
export const bg = writable('#1e1e1e')
export const bgOpacity = writable(.2)
export const bgOutro = writable('#1e1e1e')
export const fg = writable('#eeeeee')
export const sizeTitle = writable(46)
export const sizeSubtitle = writable(30)
export const title = writable('Project folder structure with Quick Actions')
export const subtitle = writable('Use Automator to instantly set up a new project folder structure right from the finder context menu')

