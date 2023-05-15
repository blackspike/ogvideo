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

  let canvas, controls, sorry
  const play = () => canvas.play()
  const reset = () => canvas.reset()
  const record = () => canvas.record()
</script>

{#if !sorry}
  <button class="sorry" on:click={() => (sorry = true)}>
    This app only fits on large screens :(
  </button>
{/if}
<main>
  <div class="canvas">
    {#if fontLoaded && logoImage}
      <Canvas {font} bind:this={canvas} />
    {/if}
  </div>
  {#if fontLoaded}
    <Controls bind:this={controls} on:play={play} on:reset={reset} on:record={record} />
  {/if}

  <footer class="hstack gap-3">
    <a class="btn credits" href="https://www.blackspike.com">by blackspike.com</a>
    <a class="btn credits" href="/demo.mp4">Demo</a>
    <a class="btn credits" href="https://github.com/blackspike/social-video-machine">GitHub</a>
  </footer>
  <VideoDialog />
</main>

<style lang="scss">
  .sorry {
    grid-template-columns: 1/-1;
    margin-block-start: var(--size-5);
    margin-inline-start: var(--size-5);
    background-color: var(--brand);
    color: var(--gray-12);
  }

  main {
    height: 100vh;
    max-width: 90rem;
    margin-inline: auto;
    display: grid;
    gap: var(--size-5);
    padding: var(--size-5);
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .credits {
    background-color: var(--gray-9);
  }
  @media screen and (min-width: 80rem) {
    .sorry {
      display: none;
    }
  }
</style>
