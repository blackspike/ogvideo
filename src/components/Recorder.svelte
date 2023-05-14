<script>
	import { onMount } from 'svelte'
	import { fabric } from 'fabric'
	import anime from 'animejs'
	import { title, fg, bg } from '../store.js'

	let video, canvas, titleText
	export let font
	const canvasSize = 640

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

		// Title
		titleText = new fabric.Textbox($title, {
			width: canvasSize - 100,
			top: canvasSize - 50,
			left: 50,
			fill: $fg,
			lineHeight: 1,
			fontSize: 46,
			originY: 'bottom',
			fontFamily: 'Satoshi-Bold'
			// fixedWidth: 150
		})
		canvas.add(titleText)

		// Update fonts
		canvas.set('fontFamily', font)
		canvas.requestRenderAll()

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

	function updateTitle() {
		if (!titleText) return
		titleText.set('text', $title)
		canvas.requestRenderAll()
	}

	// Update foreground
	$: $fg, updateFg()

	function updateFg() {
		if (!titleText) return
		titleText.set('fill', $fg)
		canvas.requestRenderAll()
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
		var videoStream = canvas.captureStream(30)
		var mediaRecorder = new MediaRecorder(videoStream)

		var chunks = []
		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data)
		}

		mediaRecorder.onstop = function (e) {
			var blob = new Blob(chunks, { type: 'video/mp4' })
			chunks = []
			var videoURL = URL.createObjectURL(blob)
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

<canvas width={canvasSize} height={canvasSize} id="canvas" />
<button on:click={record}>rec</button>
<video bind:this={video}><track kind="captions" /></video>

<style>
</style>
