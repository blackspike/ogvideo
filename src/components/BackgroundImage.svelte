<script>
  import { onMount } from 'svelte'

  import { logoImage, bgImage } from '../store.js'
  export let imageType
  let dragOver = false
  let files
  let imageFile

  // Initialise logo
  onMount(() => {})

  $: if (files) {
    imageFile = URL.createObjectURL(files[0])
    localStorage.setItem('blob', imageFile)
    imageType === 'bg' ? ($bgImage = imageFile) : ($logoImage = imageFile)
  }

  function handleDragDrop(e) {
    e.preventDefault()
    const uploadedFile = e.dataTransfer.files
    imageFile = URL.createObjectURL(uploadedFile[0])
    imageType === 'bg' ? ($bgImage = imageFile) : ($logoImage = imageFile)
  }
</script>

<div
  class="dropzone panel"
  class:dragOver
  on:dragenter={() => (dragOver = true)}
  on:dragleave={() => (dragOver = false)}
  on:drop={handleDragDrop}
  ondragover="return false"
  style="--bg: url({imageFile ? imageFile : ''})"
>
  <form class="dropzone-form">
    <input
      class="file-picker"
      type="file"
      id={imageType + 'input'}
      accept="image/png, image/jpeg, image/webp"
      bind:files
    />
    <label class="file-button" for={imageType + 'input'}
      >{imageType === 'bg' ? 'Background' : 'Logo'} Image</label
    >
  </form>
</div>

<style lang="scss">
  .dropzone {
    width: 100%;
    min-height: 5rem;
    color: var(--gray-4);
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0;
  }
  .dropzone:after {
    background-image: var(--bg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.1;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .dropzone.dragOver {
    transition: background-color 0.2s var(--ease-in-out-3);
    background-color: #ff00ff;
    color: var(--gray-0);
  }

  .dropzone-form {
    display: flex;
    min-height: 100%;
    width: 100%;
    z-index: 2;
  }
  .file-picker {
    display: none;
  }
  .file-button {
    appearance: none;
    border: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
