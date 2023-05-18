<script>
  import '../assets/css/main.scss'
  import Controls from '../components/Controls.svelte'
  import Canvas from '../components/Canvas.svelte'
  import VideoDialog from '../components/VideoDialog.svelte'
  import FontFaceObserver from 'fontfaceobserver'
  import { onMount } from 'svelte'
  import { logoImage } from '../store.js'

  let font
  let fontLoaded = false
  onMount(() => {
    font = new FontFaceObserver('Satoshi-Bold')
    font.load().then(() => (fontLoaded = true))
  })

  let canvas, controls
  const play = () => canvas.play()
  const reset = () => canvas.reset()
  const record = () => canvas.record()
</script>

<main>
  <div class="canvas">
    {#if fontLoaded && logoImage}
      <Canvas {font} bind:this={canvas} />
    {/if}
  </div>
  {#if fontLoaded}
    <div class="controls">
      <Controls bind:this={controls} on:play={play} on:reset={reset} on:record={record} />
    </div>
  {/if}

  <footer class="footer hstack gap-3">
    <a class="btn credits" href="https://www.blackspike.com">by blackspike.com</a>
    <a class="btn credits" href="/demo.mp4">Example</a>
    <a class="btn credits" href="https://github.com/blackspike/social-video-machine">GitHub</a>
  </footer>

  <VideoDialog />
</main>

<style lang="scss">
  main {
    margin: auto;
    display: grid;
    gap: var(--size-5) var(--size-1);
    padding: var(--size-5);
    display: grid;
    overflow-x: hidden;
    grid-template-areas: 'canvas' 'scrape' 'footer';
  }

  @media screen and (min-width: 70rem) {
    main {
      grid-template-columns: auto 1fr;
      grid-template-areas: 'canvas controls' 'footer footer';
    }
  }

  .controls {
    grid-area: controls;
  }
  .canvas {
    grid-area: canvas;
    align-self: center;
  }
  .credits {
    background-color: var(--gray-9);
  }
  .footer {
    grid-area: footer;
  }
</style>
