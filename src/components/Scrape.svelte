<script>
  import { title, bgImage, subtitle, bg } from '../store.js'
  import { onMount } from 'svelte'

  let fetchedData
  let url = ''

  const scraper = async () => {
    const res = await fetch(`/.netlify/functions/scrape?url=${url}`, {
      method: 'POST',
      body: JSON.stringify({ url })
    })
    const meta = await res.json()

    if (res.ok) {
      fetchedData = meta
      $title = meta.title ? meta.title : $title
      $subtitle = meta.subtitle ? meta.subtitle : $subtitle
      $bg = meta.bg ? meta.bg : '#1e1e1e'

      if (meta.bgImage) {
        const blobFromBase64 = await fetch(
          `data:'application/octet-stream';base64,${meta.bgImage}`
        ).then((res) => res.blob())
        $bgImage = URL.createObjectURL(blobFromBase64)
      }
    } else {
      throw new Error(meta)
    }
  }

  onMount(() => {
    const params = new URLSearchParams(location.search)
    const urlParam = params.get('url')
    if (urlParam) {
      url = urlParam
      scraper()
    }
  })
</script>

<form class="scraper hstack gap-2" on:submit|preventDefault={scraper}>
  <input type="url" bind:value={url} placeholder="Enter your webpage URL (beta)" />
  <button on:click={scraper} disabled={url === '  '}>fetch</button>
</form>

<style>
  input {
    font-size: var(--font-size-2);
  }
</style>
