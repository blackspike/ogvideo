<script>
  import { title, sizeTitle, subtitle, sizeSubtitle, bg, fg, bgOpacity, bgImage } from '../store.js'
  import BackgroundImage from '../components/BackgroundImage.svelte'
</script>

<div class="controls-wrapper">
  <div class="controls vstack gap-5">
    <!-- Title -->
    <section class="panel controls__title vstack gap-3">
      <label for="title" class="vstack gap-4">
        <div class="size-color hstack gap-3 space">
          <span>Title</span>
          <label for="titleSize" class="hstack gap-3">
            <span>Title Size</span>
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
            <span>Subtitle Size</span>
            <input id="subtitleSize" type="range" min="20" max="100" bind:value={$sizeSubtitle} />
          </label>
        </div>
        <textarea id="subtitle" class="textInput textInput--sm" bind:value={$subtitle} />
      </label>
    </section>
    <!-- Color -->
    <section class="panel controls__color hstack space">
      <label for="bg" class="hstack gap-3">
        <span>Background</span>
        <input type="color" id="bg" class="bg" bind:value={$bg} />
      </label>
      <label for="fg" class="hstack gap-3">
        <span>Foreground</span>
        <input type="color" id="fg" class="fg" bind:value={$fg} />
      </label>
      <label for="bgOpacity" class="hstack gap-3">
        <span>Opacity</span>
        <input id="bgOpacity" type="range" min="0" max="1" step=".1" bind:value={$bgOpacity} />
      </label>
    </section>
    <!-- BackgroundImage -->
    <section class="controls__background-image hstack gap-3">
      <BackgroundImage imageType={'bg'} />
      <!-- <button on:click={() => ($sbgImage = '')}>&times;</button> -->
      <BackgroundImage imageType={'logo'} />
    </section>
  </div>
</div>

<style lang="scss">
  .textInput {
    width: 100%;
    padding: var(--size-1) var(--size-2);
    font-size: var(--font-size-4);
  }
  .textInput--sm {
    font-size: var(--font-size-3);
  }
</style>
