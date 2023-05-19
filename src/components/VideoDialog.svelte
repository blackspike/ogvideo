<script>
  import { video } from '../store.js'
  import { onMount } from 'svelte'

  let dialog, videoEl

  onMount(() => {
    dialog = document.getElementById('dialog')
  })

  $: $video, toggleDialog()

  const toggleDialog = () => {
    if (!dialog || !$video) return
    dialog.showModal()
    videoEl.src = $video
  }
</script>

<dialog id="dialog" class="panel">
  <form method="dialog" class="content">
    <video bind:this={videoEl} autoplay controls muted playsinline>
      <track kind="captions" />
    </video>
    <footer class="vstack gap-3 space">
      <a class="btn save" href={$video} download="og-video">Download</a>
      <button value="cancel">Cancel</button>
    </footer>
  </form>
</dialog>

<style>
  dialog {
    max-height: 80vh;
    margin: auto;
    border: none;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  video {
    object-fit: contain;
    height: 100%;
    width: auto;
    max-height: 420px;
    border-radius: var(--radius-2);
  }

  .content {
    align-items: center;
    display: grid;
    gap: var(--size-5);
    grid-template-areas: 'video content';
    grid-template-columns: 1fr auto;
  }

  footer {
    height: 100%;
  }
  footer button {
    width: 100%;
  }

  .save {
    background-color: var(--brand);
  }
</style>
