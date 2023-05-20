<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import FontFaceObserver from 'fontfaceobserver'
  import { logoImage } from '../store.js'
  import Controls from '../components/Controls.svelte'
  import Spinner from '../components/Spinner.svelte'
  import Canvas from '../components/Canvas.svelte'
  import VideoDialog from '../components/VideoDialog.svelte'

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
    {#if fontLoaded && logoImage && browser}
      <Canvas {font} bind:this={canvas} />
    {:else}
      <Spinner />
    {/if}
  </div>
  {#if fontLoaded}
    <div class="controls">
      <Controls bind:this={controls} on:play={play} on:reset={reset} on:record={record} />
    </div>
  {/if}

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
    grid-template-areas: 'canvas' 'controls';
    display: contents;
  }

  @media screen and (min-width: calc(640px + 3vw)) {
    main {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  @media screen and (min-width: 75rem) {
    main {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0;
      height: 100%;
      align-items: center;
    }
  }

  .controls {
    grid-area: controls;
    margin: 1.5vw;
  }

  .canvas {
    border-radius: var(--radius-2);
    overflow: hidden;
    grid-area: canvas;
    margin: 1.5vw;
    align-self: center;
    justify-self: center;
  }
</style>
