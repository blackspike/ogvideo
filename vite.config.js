import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-netlify'

export default defineConfig({
  plugins: [sveltekit()],
  kit: {
    adapter: adapter()
  }
})
