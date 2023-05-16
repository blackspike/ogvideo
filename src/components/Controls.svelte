<script>
  import {
    title,
    sizeTitle,
    subtitle,
    sizeSubtitle,
    bg,
    fg,
    bgOpacity,
    recording
  } from '../store.js'
  import BackgroundImage from '../components/BackgroundImage.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const play = () => dispatch('play')
  const reset = () => dispatch('reset')
  const record = () => {
    $recording = !$recording
    dispatch('record')
  }
  $: recodingActive = $recording
</script>

<div class="controls-wrapper" disabled={$recording}>
  <div class="controls vstack gap-5">
    <!-- Timeline -->
    <section class="panel controls__timeline hstack space">
      <span class="hstack gap-3">
        <button on:click={play}>Play</button>
        <!-- <button on:click={reset}>Reset</button> -->
        <button on:click={record} class:recodingActive>
          {$recording ? 'Recording…' : 'Record Video'}
        </button>
      </span>
      <h1>Social Video Maker</h1>
    </section>
    <!-- Title -->
    <section class="panel controls__title vstack gap-3">
      <label for="title" class="vstack gap-4">
        <div class="size-color hstack gap-3 space">
          <span>Title</span>
          <label for="titleSize" class="hstack gap-3">
            <span>Font Size</span>
            <input id="titleSize" type="range" min="20" max="100" bind:value={$sizeTitle} />
          </label>
        </div>
        <textarea id="title" class="textInput" bind:value={$title} />
      </label>
    </section>
    <!-- subtitle -->
    <section class="panel controls__subtitle vstack gap-3">
      <label for="subtitle" class="vstack gap-4">
        <div class="size-color hstack gap-3 space">
          <span>Subtitle</span>
          <label for="subtitleSize" class="hstack gap-3">
            <span>Font Size</span>
            <input id="subtitleSize" type="range" min="20" max="100" bind:value={$sizeSubtitle} />
          </label>
        </div>
        <textarea id="subtitle" class="textInput textInput--sm" bind:value={$subtitle} />
      </label>
    </section>
    <!-- Color -->
    <section class="panel controls__color hstack space">
      <label for="fg" class="hstack gap-3">
        <span>Foreground</span>
        <input type="color" id="fg" class="fg" bind:value={$fg} />
      </label>
      <label for="bg" class="hstack gap-3">
        <span>Background</span>
        <input type="color" id="bg" class="bg" bind:value={$bg} />
      </label>
      <label for="bgOpacity" class="hstack gap-3">
        <span>Opacity</span>
        <input id="bgOpacity" type="range" min="0" max="1" step=".1" bind:value={$bgOpacity} />
      </label>
    </section>
    <!-- BackgroundImage -->
    <section class="controls__background-image hstack gap-3">
      <BackgroundImage imageType={'bg'} />
      <BackgroundImage imageType={'logo'} />
    </section>
  </div>
</div>

<style lang="scss">
  .controls-wrapper[disabled='true'] {
    opacity: 0.2;
    pointer-events: none;
    transition: opacity 1s var(--ease-in-out-3);
  }
  .textInput {
    width: 100%;
    padding: var(--size-1) var(--size-2);
    font-size: var(--font-size-4);
  }
  .textInput--sm {
    font-size: var(--font-size-3);
  }
  .recodingActive {
    background-color: var(--brand);
  }
</style>
