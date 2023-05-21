<script>
  import { dev } from '$app/environment'
  import '../assets/css/main.scss'
</script>

<svelte:head>
  {#if !dev}
    <script defer data-domain="ogvideo.app" src="/js/script.js"></script>
  {/if}
</svelte:head>

<slot />
