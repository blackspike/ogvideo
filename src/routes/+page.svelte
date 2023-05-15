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
    Sorry this app only fits on large screens :(
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

  <footer>
    <a href="https://www.blackspike.com" class="btn">by blackspike.com</a>
  </footer>
  <VideoDialog />
</main>

<style lang="scss">
  .sorry {
    grid-template-columns: 1/-1;
    margin: var(--size-5);
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
    overflow-x: hidden;
    display: contents;
  }

  @media screen and (min-width: 80rem) {
    main {
      display: grid;
      grid-template-columns: auto 1fr;
    }
    .sorry {
      display: none;
    }
  }

  @media screen and (min-width: 90rem) {
    main {
      display: grid;
      grid-template-columns: auto 1fr;
    }
  }
</style>
