<script>
  import '../assets/css/main.scss'
  import Controls from '../components/Controls.svelte'
  import Canvas from '../components/Canvas.svelte'
  import FontFaceObserver from 'fontfaceobserver'
  import { onMount } from 'svelte'
  import { logoImage, bgImage } from '../store.js'

  let font
  let fontLoaded = false
  onMount(() => {
    font = new FontFaceObserver('Satoshi-Bold')
    font.load().then(() => (fontLoaded = true))
  })

  let canvas, controls
  const play = () => canvas.play()
  const reset = () => canvas.reset()
</script>

<main>
  <div class="canvas">
    {#if fontLoaded && logoImage}
      <Canvas {font} bind:this={canvas} />
    {/if}
  </div>
  {#if fontLoaded}
    <Controls bind:this={controls} on:play={play} on:reset={reset} />
  {/if}
</main>

<style lang="scss">
  main {
    height: 100vh;
    max-width: 90rem;
    margin-inline: auto;
    display: grid;
    gap: var(--size-5);
    grid-template-columns: auto 1fr;
    padding: var(--size-5);
  }
</style>
