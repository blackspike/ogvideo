<script>
  import { title, bgImage, subtitle, bg } from '../store.js'

  let fetchedData
  let url = 'https://www.blackspike.com/blog/firefox-get-info/'

  const fetchImage = async (bgImageUrl) => {
    const response = await fetch(bgImageUrl)
    const blob = await response.blob()
    const imageFile = URL.createObjectURL(blob)
    console.log(bgImageUrl)

    return imageFile
  }

  const scraper = async () => {
    const res = await fetch(`/.netlify/functions/scrape?url=${url}`)
    const meta = await res.json()

    if (res.ok) {
      fetchedData = meta
      $title = meta.title ? meta.title : $title
      $subtitle = meta.subtitle ? meta.subtitle : $subtitle
      $bg = meta.bg ? meta.bg : '#1e1e1e'
      $bgImage = await fetchImage(meta.bgImage)
    } else {
      throw new Error(meta)
    }
  }
</script>

<div class="scraper hstack gap-2">
  <input type="url" bind:value={url} />
  <button on:click={scraper}>fetch</button>
</div>

<style>
  .scraper {
    padding: var(--size-2);
    border-radius: var(--radius-2);
    background-color: var(--gray-9);
    z-index: var(--layer-3);
  }
  input {
    font-size: var(--font-size-2);
  }
</style>
