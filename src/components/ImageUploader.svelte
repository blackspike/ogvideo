<script>
  import { browser } from '$app/environment'
  import { logoImage, bgImage } from '../store.js'
  export let imageType
  let dragOver = false
  let files
  let imageFile

  // save to storage
  const saveToStorage = async (file, type) => {
    // convert image file to base64 string
    const reader = new FileReader()
    reader.addEventListener('load', () => localStorage.setItem(type, reader.result), false)

    if (file) reader.readAsDataURL(file)
  }

  // Handle image uploads
  $: if (files) {
    imageFile = URL.createObjectURL(files[0])
    imageType === 'bg' ? ($bgImage = imageFile) : ($logoImage = imageFile)

    if (browser) {
      localStorage.setItem('blob', imageFile)
      saveToStorage(files[0], imageType)
    }
  }

  // Handle image drag
  function handleDragDrop(e) {
    e.preventDefault()
    const uploadedFile = e.dataTransfer.files
    imageFile = URL.createObjectURL(uploadedFile[0])
    imageType === 'bg' ? ($bgImage = imageFile) : ($logoImage = imageFile)

    if (browser) {
      saveToStorage(files[0], imageType)
    }
  }

  $: watermark = imageType === 'bg' ? $bgImage : $logoImage
</script>

<div
  class="dropzone panel"
  class:dragOver
  on:dragenter={() => (dragOver = true)}
  on:dragleave={() => (dragOver = false)}
  on:drop={handleDragDrop}
  ondragover="return false"
  style="--bg: url({watermark ? watermark : ''}); background-size: {imageType === 'bg' ? 'cover' : 'contain'}"
>
  <form class="dropzone-form">
    <input class="file-picker" type="file" id={imageType + 'input'} accept="image/png, image/jpeg, image/webp" bind:files />
    <label class="file-button" for={imageType + 'input'}>{imageType === 'bg' ? 'Background' : 'Logo'} Image</label>
  </form>
</div>

<style lang="scss">
  .dropzone {
    block-size: 100%;
    color: var(--gray-4);
    display: flex;
    inline-size: 100%;
    min-block-size: 5rem;
    padding: 0;
    transition: background-color 0.2s var(--ease-in-out-3);
  }
  .dropzone:after {
    background-image: var(--bg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: inherit;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.2;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .dropzone.dragOver {
    background-color: #ff00ff;
    color: var(--gray-0);
  }
  .dropzone:hover {
    background: var(--gray-8);
  }

  .dropzone-form {
    display: flex;
    inline-size: 100%;
    min-block-size: 100%;
    z-index: 2;
  }
  .file-picker {
    display: none;
  }
  .file-button {
    align-items: center;
    appearance: none;
    block-size: 100%;
    border: 0;
    display: flex;
    inline-size: 100%;
    justify-content: center;
    text-shadow: 0 0.15rem 0.2rem rgb(0 0 0 / 0.9);
  }
</style>
