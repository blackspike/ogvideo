import { writable, readable, derived } from 'svelte/store'
export const playing = writable(false)
export const recording = writable(false)
export const video = writable(null)
export const bgImage = writable('')
export const logoImage = writable('')
export const bg = writable('#1e1e1e')
export const bgOpacity = writable(.15)
export const bgOutro = writable('#1e1e1e')
export const fg = writable('#eeeeee')
export const sizeTitle = writable(46)
export const sizeSubtitle = writable(30)
export const title = writable('Create a short video for your blog post to share on social media.')
export const subtitle = writable(
  'You can add custom text, colours, your logo and a background image. If you pop your url in the box over there, it will auto-fill the content. Then just click Create Video!'
)
