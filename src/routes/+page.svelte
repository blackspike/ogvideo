<script>
	import '../assets/css/main.scss'
	import Controls from '../components/Controls.svelte'
	import Canvas from '../components/Canvas.svelte'
	import FontFaceObserver from 'fontfaceobserver'
	import { onMount } from 'svelte'

	let font
	let fontLoaded = false
	onMount(() => {
		font = new FontFaceObserver('Satoshi-Bold')
		font.load().then(() => (fontLoaded = true))
	})
</script>

<main>
	<div class="canvas">
		{#if fontLoaded}
			<Canvas {font} />
		{/if}
	</div>

	<Controls />
</main>

<style lang="scss">
	main {
		height: 100vh;
		max-width: 90rem;
		margin-inline: auto;
		display: grid;
		gap: var(--size-5);
		grid-template-columns: auto 1fr;
		padding: var(--size-5);
	}
</style>
