<script>
	import { onMount } from 'svelte'
	import { fabric } from 'fabric'
	import anime from 'animejs'
	import { title, subtitle, fg, bg, sizeTitle, sizeSubtitle } from '../store.js'

	let video, canvas, titleText, subtitleText
	export let font
	const canvasSize = 640
	const textDefaults = {
		width: canvasSize - 100,
		left: 50,
		fill: $fg,
		lineHeight: 1.1,
		originY: 'bottom',
		fontFamily: 'Satoshi-Bold'
	}
	let subtitleTextHeight
	$: titlePosY = canvasSize - 80 - subtitleTextHeight

	onMount(() => {
		canvas = new fabric.Canvas('canvas', {
			backgroundColor: $bg
		})

		let rect = new fabric.Rect({
			left: 120,
			top: 10,
			fill: 'teal',
			width: 150,
			height: 150,
			angle: 45
		})
		rect.name = 'thing'
		canvas.add(rect)

		// Subtitle
		subtitleText = new fabric.Textbox($subtitle, {
			...textDefaults,
			top: canvasSize - 50,
			fontSize: $sizeSubtitle
		})
		canvas.add(subtitleText)

		// Title
		titleText = new fabric.Textbox($title, {
			...textDefaults,
			fontSize: $sizeTitle,
			top: canvasSize - 80 - subtitleText.calcTextHeight()
		})
		canvas.add(titleText)

		// Update fonts
		canvas.set('fontFamily', font)
		canvas.requestRenderAll()

		// Animate
		anime({
			targets: canvas.getObjects().find((o) => o.name === 'thing'),
			left: [-300, 300],
			easing: 'linear',
			update: function () {
				canvas.renderAll()
			},
			duration: 4000,
			loop: true
		})
	})

	// Update title text
	$: $title, updateTitle()
	$: $sizeTitle, updateTitle()

	$: $subtitle, updateSubtitle()
	$: $sizeSubtitle, updateSubtitle()

	$: $fg, updateFg()

	function updateTitle() {
		if (!titleText) return
		titleText.set('text', $title)
		titleText.set('fontSize', $sizeTitle)
		canvas.requestRenderAll()
	}

	function updateSubtitle() {
		if (!subtitleText) return

		subtitleText.set('text', $subtitle)
		subtitleText.set('fontSize', $sizeSubtitle)

		subtitleTextHeight = subtitleText.calcTextHeight()
		titleText.set('top', canvasSize - 80 - subtitleTextHeight)
		canvas.requestRenderAll()
	}

	function updateFg() {
		if (!titleText || !subtitleText) return
		titleText.set('fill', $fg)
		subtitleText.set('fill', $fg)
	}

	// Update background
	$: $bg, updateBg()

	function updateBg() {
		if (!canvas) return
		canvas.set('backgroundColor', $bg)
		canvas.requestRenderAll()
	}

	// Record
	const record = async () => {
		const canvas = document.getElementById('canvas')
		const videoStream = canvas.captureStream(30)
		const mediaRecorder = new MediaRecorder(videoStream)

		let chunks = []

		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data)
		}

		mediaRecorder.onstop = function (e) {
			const blob = new Blob(chunks, { type: 'video/mp4' })
			chunks = []
			const videoURL = URL.createObjectURL(blob)
			video.src = videoURL
		}
		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data)
		}

		mediaRecorder.start()
		// setInterval(draw, canvasSize);
		setTimeout(function () {
			mediaRecorder.stop()
		}, 5000)
	}
</script>

<section class="wrapper">
	<canvas width={canvasSize} height={canvasSize} id="canvas" />

	<details class="stuff panel">
		<summary>Output</summary>
		<button on:click={record}>rec</button>
		<video bind:this={video}><track kind="captions" /></video>
	</details>
</section>

<style lang="scss">
	.wrapper {
		position: sticky;
		top: var(--size-9);
		height: 100%;
	}
	.stuff {
		position: absolute;
		bottom: 0;
	}
</style>
