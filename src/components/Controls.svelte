<script>
  import { title, sizeTitle, subtitle, sizeSubtitle, bg, fg, bgOpacity, recording, playing } from '../store.js'
  import ImageUploader from '../components/ImageUploader.svelte'
  import Scrape from '../components/Scrape.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const play = () => {
    dispatch('play')
    $playing = true
  }

  const reset = () => {
    dispatch('reset')
    $playing = false
  }

  const record = () => {
    $recording = !$recording
    dispatch('record')
  }
  $: recodingActive = $recording
</script>

<div class="controls-wrapper" disabled={$recording}>
  <div class="controls vstack gap-2">
    <!-- Timeline -->
    <section class="panel controls__timeline gap-5 hstack space">
      <span class="hstack gap-2">
        {#if $playing}
          <button class="play-pause" on:click={reset}>Stop</button>
        {:else}
          <button class="play-pause" on:click={play}>Play</button>
        {/if}
        <button on:click={record} class:recodingActive>
          {$recording ? 'Recording…' : 'Create Video'}
        </button>
      </span>
      <header class="hstack gap-2">
        <h1 class="q-title">
          <span class="q-title-text">OG Video</span>
        </h1>
        <a href="/about" class="btn-plain q-link" aria-label="About this app">
          <svg aria-hidden="true" class="q-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
            ><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              ><path d="M0 0h24v24H0z" /><path
                fill="currentColor"
                d="m12 2l.642.005l.616.017l.299.013l.579.034l.553.046c4.687.455 6.65 2.333 7.166 6.906l.03.29l.046.553l.041.727l.006.15l.017.617L22 12l-.005.642l-.017.616l-.013.299l-.034.579l-.046.553c-.455 4.687-2.333 6.65-6.906 7.166l-.29.03l-.553.046l-.727.041l-.15.006l-.617.017L12 22l-.642-.005l-.616-.017l-.299-.013l-.579-.034l-.553-.046c-4.687-.455-6.65-2.333-7.166-6.906l-.03-.29l-.046-.553l-.041-.727l-.006-.15l-.017-.617l-.004-.318v-.648l.004-.318l.017-.616l.013-.299l.034-.579l.046-.553c.455-4.687 2.333-6.65 6.906-7.166l.29-.03l.553-.046l.727-.041l.15-.006l.617-.017c.21-.003.424-.005.642-.005zm0 13a1 1 0 0 0-.993.883L11 16l.007.127a1 1 0 0 0 1.986 0L13 16.01l-.007-.127A1 1 0 0 0 12 15zm1.368-6.673a2.98 2.98 0 0 0-3.631.728a1 1 0 0 0 1.44 1.383l.171-.18a.98.98 0 0 1 1.11-.15a1 1 0 0 1-.34 1.886l-.232.012A1 1 0 0 0 11.997 14a3 3 0 0 0 1.371-5.673z"
              /></g
            ></svg
          >
        </a>
      </header>
    </section>
    <!-- scrape -->
    <section class="panel controls__scrape">
      <div class="scrape">
        <Scrape />
      </div>
    </section>
    <!-- Title -->
    <section class="panel controls__title vstack gap-3">
      <label for="title" class="vstack gap-3">
        <div class="size-color hstack gap-3 space">
          <span class="flex-fill">Title</span>
          <label for="titleSize" class="hstack gap-3">
            <span>Font Size</span>
            <input id="titleSize" type="range" min="20" max="100" bind:value={$sizeTitle} />
          </label>
          <label for="fg" class="color-input-fg" aria-label="foreground-color" style={`--fg: ${$fg}; border-radius: 50%`}>
            <input class="visually-hidden fg" type="color" id="fg" bind:value={$fg} />
          </label>
        </div>
        <textarea id="title" class="textInput" bind:value={$title} />
      </label>
    </section>

    <!-- Subtitle -->
    <section class="panel controls__subtitle vstack gap-3">
      <label for="subtitle" class="vstack gap-3">
        <div class="size-color hstack gap-3 space">
          <span class="flex-fill">Subtitle</span>
          <label for="subtitleSize" class="hstack gap-3">
            <span>Font Size</span>
            <input id="subtitleSize" type="range" min="20" max="100" bind:value={$sizeSubtitle} />
          </label>
          <label for="fg2" class="color-input-fg" aria-label="Foreground color" style={`--fg: ${$fg}; border-radius: 50%`}>
            <input class="visually-hidden fg" type="color" id="fg2" bind:value={$fg} />
          </label>
        </div>
        <textarea id="subtitle" class="textInput textInput--sm" bind:value={$subtitle} />
      </label>
    </section>

    <!-- Color -->
    <section class="panel controls__bgcolor hstack gap-3">
      <label for="bgOpacity" class="flex-fill hstack gap-3">
        <span>Background Color</span>
        <input class="flex-fill" id="bgOpacity" type="range" min="0" max="1" step=".01" bind:value={$bgOpacity} />
      </label>
      <label for="bg" class="color-input-bg" aria-label="Background color" style={`--bg: ${$bg}; border-radius: 50%`}>
        <input class="visually-hidden bg" type="color" id="bg" bind:value={$bg} />
      </label>
    </section>

    <!-- ImageUploader -->
    <section class="controls__background-image hstack gap-2">
      <ImageUploader imageType="bg" />
      <ImageUploader imageType="logo" />
    </section>
  </div>
</div>

<style lang="scss">
  label {
    color: var(--gray-5);
    font-family: 'Inter';
    font-weight: var(--font-weight-6);
  }
  [type='range'] {
    opacity: 0.5;
  }
  [type='range']:hover {
    opacity: 1;
  }
  .controls-wrapper[disabled='true'] {
    opacity: 0.2;
    pointer-events: none;
    transition: opacity 1s var(--ease-in-out-3);
  }
  @media screen and (min-width: 80rem) {
    .controls-wrapper {
      width: 35rem;
    }
  }
  .controls {
    width: 100%;
    height: 100%;
  }

  .q-title-text {
    display: none;
    font-size: var(--font-size-3);
  }

  @media screen and (min-width: 640px) {
    .q-title-text {
      display: block;
    }
  }

  .q-link {
    color: var(--gray-0);
    text-decoration: none;
    padding: var(--size-1);
    display: flex;
    align-items: center;
  }
  .q-icon {
    height: var(--size-5);
    width: var(--size-5);
    color: var(--brand);
  }
  .play-pause {
    min-width: 5rem;
  }

  .textInput {
    min-height: 6rem;
  }

  .textInput--sm {
    font-size: var(--font-size-2);
  }
  .recodingActive {
    background-color: var(--brand);
  }

  .flex-fill {
    flex: 2;
  }
  .color-input-fg {
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: var(--fg);
    border: 2px solid var(--gray-5);
  }
  .color-input-bg {
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: var(--bg);
    border: 2px solid var(--gray-5);
  }
</style>
