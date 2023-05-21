<script>
  import { title, bgImage, subtitle, bg } from '../store.js'
  import { onMount } from 'svelte'

  let fetchLoading
  let url = ''

  const scraper = async () => {
    fetchLoading = true

    const res = await fetch(`/.netlify/functions/scrape?url=${url}`, {
      method: 'POST',
      body: JSON.stringify({ url })
    })
    const meta = await res.json()

    if (res.ok) {
      $title = meta.title ? meta.title : $title
      $subtitle = meta.subtitle ? meta.subtitle : $subtitle
      meta.bg ? ($bg = meta.bg) : null

      if (meta.bgImage) {
        const blobFromBase64 = await fetch(`data:'application/octet-stream';base64,${meta.bgImage}`).then((res) => res.blob())
        $bgImage = URL.createObjectURL(blobFromBase64)
      }
      fetchLoading = false
    } else {
      fetchLoading = false
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

<form class="scraper hstack gap-2" on:submit|preventDefault={scraper} class:fetchLoading>
  <input type="url" bind:value={url} placeholder="Your webpage URL" />

  <button class="fetch-btn" on:click={scraper}>
    {fetchLoading ? 'Fetching…' : 'Fetch'}
  </button>
</form>

<style>
  .fetchLoading {
    pointer-events: none;
    opacity: 0.3;
    transition: all 0.3s var(--ease-in-out-3);
  }

  input {
    font-size: var(--font-size-2);
  }
  input:invalid {
    outline: 2px solid orangered;
  }

  .fetch-btn {
    min-width: 7rem;
  }
</style>
