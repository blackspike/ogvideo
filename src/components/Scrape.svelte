<script>
  import { title, bgImage, subtitle, bg } from '../store.js'
  import { onMount } from 'svelte'

  let fetchedData, fetching
  let url = ''

  const scraper = async () => {
    fetching = true

    const res = await fetch(`/.netlify/functions/scrape?url=${url}`, {
      method: 'POST',
      body: JSON.stringify({ url })
    })
    const meta = await res.json()

    if (res.ok) {
      fetchedData = meta
      $title = meta.title ? meta.title : $title
      $subtitle = meta.subtitle ? meta.subtitle : $subtitle
      meta.bg ? ($bg = meta.bg) : null

      if (meta.bgImage) {
        const blobFromBase64 = await fetch(`data:'application/octet-stream';base64,${meta.bgImage}`).then((res) => res.blob())
        $bgImage = URL.createObjectURL(blobFromBase64)
      }
      fetching = false
    } else {
      fetching = false
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

<form class="scraper hstack gap-2" on:submit|preventDefault={scraper} class:fetching>
  <input type="url" bind:value={url} placeholder="Enter your webpage URL" />
  <button class="fetch-btn" on:click={scraper} disabled={url === '  '}>
    {fetching ? 'Fetching…' : 'Fetch'}
  </button>
</form>

<style>
  .fetching {
    pointer-events: none;
    opacity: 0.3;
    transition: all 0.3s var(--ease-in-out-3);
  }

  input {
    font-size: var(--font-size-2);
  }

  .fetch-btn {
    min-width: 7rem;
  }
</style>
