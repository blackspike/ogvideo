<script>
	import '../assets/css/main.scss'
	import Recorder from '../components/Recorder.svelte'
	import FontFaceObserver from 'fontfaceobserver'
	import { onMount } from 'svelte'
	import { title, bg, fg } from '../store.js'

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
			<Recorder {font} />
		{/if}
	</div>
	<div class="controls vstack gap-5">
		<label for="title">
			<span>Title</span>
			<textarea id="title" class="title" bind:value={$title} />
		</label>

		<div class="hstack gap-3 space">
			<label for="bg" class="hstack gap-3">
				<span>Background Colour</span>
				<input type="color" id="bg" class="bg" bind:value={$bg} />
			</label>
			<label for="fg" class="hstack gap-3">
				<span>Foreground Colour</span>
				<input type="color" id="fg" class="fg" bind:value={$fg} />
			</label>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		gap: var(--size-9);
		grid-template-columns: 1fr 1fr;
		padding: var(--size-5);
	}
	.controls {
		padding: var(--size-5);
	}

	.title {
		width: 100%;
		padding: 0.5rem;
	}
</style>
