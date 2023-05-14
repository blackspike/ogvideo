<script>
	import { title, subtitle, bg, fg, sizeTitle, sizeSubtitle } from '../store.js'
	import BackgroundImage from '../components/BackgroundImage.svelte'
</script>

<div class="controls-wrapper">
	<div class="controls vstack gap-5">
		<!-- Title -->
		<section class="panel controls__title vstack gap-3">
			<label for="title" class="vstack gap-2">
				<span>Title</span>
				<textarea id="title" class="textInput" bind:value={$title} />
			</label>

			<div class="size-color hstack gap-3 space">
				<label for="titleSize" class="hstack gap-3">
					<span>Title Size</span>
					<input id="titleSize" type="range" min="20" max="100" bind:value={$sizeTitle} />
				</label>
			</div>
		</section>
		<!-- subtitle -->
		<section class="panel controls__subtitle vstack gap-3">
			<label for="subtitle" class="vstack gap-2">
				<span>Subtitle</span>
				<textarea id="subtitle" class="textInput" bind:value={$subtitle} />
			</label>

			<div class="size-color hstack gap-3 space">
				<label for="subtitleSize" class="hstack gap-3">
					<span>Subtitle Size</span>
					<input id="subtitleSize" type="range" min="20" max="100" bind:value={$sizeSubtitle} />
				</label>
			</div>
		</section>
		<!-- Color -->
		<section class="panel controls__color hstack gap-3">
			<label for="bg" class="hstack gap-3">
				<span>Background</span>
				<input type="color" id="bg" class="bg" bind:value={$bg} />
			</label>
			<label for="fg" class="hstack gap-3">
				<span>Foreground</span>
				<input type="color" id="fg" class="fg" bind:value={$fg} />
			</label>
		</section>
		<!-- BackgroundImage -->
		<section class="controls__background-image hstack gap-3">
			<BackgroundImage />
		</section>
	</div>
</div>

<style lang="scss">
	.controls {
	}
	.textInput {
		width: 100%;
		padding: var(--size-1) var(--size-2);
		font-size: var(--font-size-4);
	}
</style>
