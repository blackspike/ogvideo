<script>
  import { onMount } from 'svelte'
  import { fabric } from 'fabric'
  import anime from 'animejs'
  import {
    fg,
    bg,
    subtitle,
    sizeSubtitle,
    title,
    sizeTitle,
    bgOutro,
    bgImage,
    bgOpacity,
    logoImage
  } from '../store.js'

  export let font

  let video, canvas, titleText, subtitleText, animTimeline, logo, mask

  const canvasSize = 640
  const textDefaults = {
    width: canvasSize - 100,
    left: 50,
    fill: $fg,
    lineHeight: 1.1,
    originY: 'bottom',
    fontFamily: 'Satoshi-Bold'
  }
  const layers = {
    BG: 1,
    TITLES: 2,
    MASK: 3,
    LOGO: 4
  }

  onMount(() => {
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: $bg,
      preserveObjectStacking: true
    })

    // Disable selection
    fabric.Object.prototype.selectable = false

    // Subtitle
    subtitleText = new fabric.Textbox($subtitle, {
      ...textDefaults,
      top: canvasSize - 50,
      fontSize: $sizeSubtitle
    })
    canvas.insertAt(subtitleText, layers.TITLES)

    // Title
    titleText = new fabric.Textbox($title, {
      ...textDefaults,
      fontSize: $sizeTitle,
      top: canvasSize - 80 - subtitleText.calcTextHeight()
    })

    canvas.insertAt(titleText, layers.TITLES)

    // Update fonts
    canvas.set('fontFamily', font)
    canvas.requestRenderAll()

    // Add outro
    mask = new fabric.Rect({
      fill: $bgOutro,
      width: canvasSize,
      height: canvasSize,
      opacity: 0
    })
    mask.id = 'mask'
    canvas.insertAt(mask, layers.MASK)

    // Add logo image
    fabric.Image.fromURL($logoImage, (img) => {
      img.set({
        originX: 'center',
        originY: 'center',
        opacity: 0
      })
      img.scaleToHeight(canvasSize / 4)
      canvas.centerObject(img)
      img.id = 'logoImage'
      img.center()
      logo = img

      canvas.insertAt(img, layers.LOGO)
    })
  })

  // Animate
  // targets: canvas.getObjects().find((o) => o.id === 'thing'),

  animTimeline = anime.timeline({
    autoplay: true,
    update: function () {
      canvas.renderAll()
    }
  })

  export function reset() {
    animTimeline.pause()

    titleText.top += 30
    titleText.opacity = 1
    // subtitleText.top += 30
    subtitleText.opacity = 1
    const mask = canvas.getObjects().find((obj) => obj.id === 'mask')
    const logoImage = canvas.getObjects().find((obj) => obj.id === 'logoImage')
    mask.opacity = 0
    logoImage.opacity = 0
    console.log('reset')
  }

  export function play() {
    let typingTime = 0
    let count = $title.length
    let typingPause = 20
    typingTime = typingPause * count

    animTimeline.seek(0)

    animTimeline
      .add({
        targets: titleText,
        easing: 'easeOutQuad',
        duration: 1000,
        top: '-=30'
      })
      .add(
        {
          targets: titleText,
          easing: 'easeOutQuad',
          duration: 1000,

          begin: () => {
            titleText.set('text', '')
            let cur = 0
            let t = ''
            setInterval(() => {
              if (cur >= count) return
              titleText.set('text', (t += $title[cur]))
              cur++
            }, typingPause)
          }
        },
        `-=1000`
      )
      .add({
        targets: subtitleText,
        easing: 'easeOutQuad',
        duration: 1000,
        opacity: [0, 1],
        delay: 500,
        top: '-=30'
      })
      .add(
        {
          targets: canvas.getObjects().find((obj) => obj.id === 'mask'),
          opacity: [0, 1],
          easing: 'linear',
          duration: 500
        },
        `+=${typingTime + 2000}`
      )
      .add({
        targets: canvas.getObjects().find((obj) => obj.id === 'logoImage'),
        opacity: [0, 1],
        scaleX: [0.4, 0.5],
        scaleY: [0.4, 0.5],
        easing: 'easeInOutSine',
        duration: 500,
        delay: 500
      })
      .add({
        targets: canvas.getObjects().find((obj) => obj.id === 'logoImage'),
        opacity: [1, 0],
        scaleX: [0.5, 0.6],
        scaleY: [0.5, 0.6],
        easing: 'easeOutCubic',
        duration: 500,
        delay: 2500
      })
      .add({
        opacity: 0,
        duration: 2000,
        complete: () => {
          titleText.top += 30
          titleText.opacity = 1
          subtitleText.top += 30
          subtitleText.opacity = 1
          const mask = canvas.getObjects().find((obj) => obj.id === 'mask')
          const logoImage = canvas.getObjects().find((obj) => obj.id === 'logoImage')
          mask.opacity = 0
          logoImage.opacity = 0
        }
      })
  }

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

    titleText.set('top', canvasSize - 80 - subtitleText.calcTextHeight())
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

  // Update background image
  $: $bgImage, updateBgImage()
  $: $bgOpacity, updateBgImageOpacity()

  function updateBgImage() {
    if (!canvas || !$bgImage) return
    const currentImage = canvas.getObjects().find((obj) => obj.id === 'bgImage')
    canvas.remove(currentImage)

    fabric.Image.fromURL($bgImage, (img) => {
      img.set({ opacity: $bgOpacity })
      img.scaleToHeight(canvasSize)
      img.id = 'bgImage'
      canvas.insertAt(img, layers.BG)
    })
  }

  function updateBgImageOpacity() {
    if (!canvas) return
    const currentImage = canvas.getObjects().find((obj) => obj.id === 'bgImage')

    if (currentImage) {
      currentImage.set('opacity', $bgOpacity)
    }
  }

  // Update background image
  $: $logoImage, updateLogoImage()

  function updateLogoImage() {
    if (!canvas || !$logoImage) return
    const currentImage = canvas.getObjects().find((obj) => obj.id === 'logoImage')
    canvas.remove(currentImage)

    fabric.Image.fromURL($logoImage, (img) => {
      img.set({
        originX: 'center',
        originY: 'center'
      })
      img.scaleToHeight(canvasSize / 4)
      img.id = 'logoImage'
      img.center()
      canvas.insertAt(img, layers.LOGO)
    })
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
