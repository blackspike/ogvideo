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
    logoImage,
    recording,
    video
  } from '../store.js'

  export let font

  let canvas, titleText, subtitleText, animTimeline, bgAnim, logo, mask

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
    BG: 0,
    TITLE: 1,
    SUBTITLE: 2,
    MASK: 3,
    LOGO: 4
  }

  onMount(() => {
    // Create canvas
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: $bg,
      preserveObjectStacking: true
    })
    // Set images
    fetch('/blackspike-logo.png')
      .then((res) => res.blob())
      .then((blob) => ($logoImage = URL.createObjectURL(blob)))

    fetch('/temp.webp')
      .then((res) => res.blob())
      .then((blob) => ($bgImage = URL.createObjectURL(blob)))

    // Disable selection
    fabric.Object.prototype.selectable = false

    // Subtitle
    subtitleText = new fabric.Textbox($subtitle, {
      ...textDefaults,
      top: canvasSize - 50,
      fontSize: $sizeSubtitle
    })
    canvas.insertAt(subtitleText, layers.SUBTITLE)

    // Title
    titleText = new fabric.Textbox($title, {
      ...textDefaults,
      fontSize: $sizeTitle,
      top: canvasSize - 80 - subtitleText.calcTextHeight()
    })

    canvas.insertAt(titleText, layers.TITLE)

    // Add outro
    mask = new fabric.Rect({
      fill: $bgOutro,
      width: canvasSize + 10,
      height: canvasSize + 10,
      left: -5,
      top: -5,
      opacity: 0
    })
    mask.id = 'mask'
    canvas.insertAt(mask, layers.MASK)

    // Update fonts
    canvas.set('fontFamily', font)
    canvas.requestRenderAll()
  })

  // Animate
  animTimeline = anime.timeline({
    update: function () {
      canvas.renderAll()
    }
  })

  // Reset
  export function reset() {
    animTimeline.pause()
    animTimeline.seek(animTimeline.duration - 1)

    titleText.top += 30
    titleText.opacity = 1
    subtitleText.top += 30
    subtitleText.opacity = 1
    const mask = canvas.getObjects().find((obj) => obj.id === 'mask')
    const logoImage = canvas.getObjects().find((obj) => obj.id === 'logoImage')
    const bgImage = canvas.getObjects().find((obj) => obj.id === 'bgImage')
    bgImage.left = 0
    mask.opacity = 0
    logoImage.opacity = 0
  }

  // Play
  export function play() {
    // re-init timeline
    animTimeline = anime.timeline({
      update: function () {
        canvas.renderAll()
      }
    })

    const mask = canvas.getObjects().find((obj) => obj.id === 'mask')
    const logoImage = canvas.getObjects().find((obj) => obj.id === 'logoImage')
    const bgImage = canvas.getObjects().find((obj) => obj.id === 'bgImage')

    const orig = {
      logoScaleX: logoImage.scaleX,
      logoScaleY: logoImage.scaleY,
      titleTextTop: titleText.top,
      subtitleTextTop: subtitleText.top
    }

    // animTimeline.reset()

    // TextTyper
    let interval
    let typingTime = 0
    let count = $title.length
    let typingPause = 20
    typingTime = typingPause * count

    titleText.opacity = 0
    subtitleText.opacity = 0

    bgAnim = anime({
      targets: bgImage,
      left: [0, canvasSize - bgImage.aCoords.tr.x],
      duration: 20000,
      loop: true,
      easing: 'linear',
      direction: 'alternate'
    })

    // Timeline
    animTimeline
      .add({
        targets: titleText,
        opacity: [0, 1],
        top: '-=30',
        easing: 'easeOutQuad',
        duration: 1000,
        delay: 1000,
        complete: () => console.log('complete 0')
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
            interval = setInterval(() => {
              if (cur >= count) return
              titleText.set('text', (t += $title[cur]))
              cur++
            }, typingPause)
          },
          complete: () => console.log('complete 1')
        },
        `-=1000`
      )
      .add({
        targets: subtitleText,
        easing: 'easeOutQuad',
        duration: 1000,
        opacity: [0, 1],
        delay: 500,
        top: '-=30',
        complete: () => console.log('complete 2')
      })
      .add(
        {
          targets: mask,
          opacity: [0, 1],
          easing: 'linear',
          duration: 500,
          complete: () => console.log('complete 3')
        },
        `+=${typingTime + 2000}`
      )
      .add({
        targets: logoImage,
        opacity: [0, 1],
        scaleX: logoImage.scaleX + 0.1,
        scaleY: logoImage.scaleY + 0.1,
        easing: 'easeInOutSine',
        duration: 500,
        delay: 500,
        complete: () => console.log('complete 4')
      })
      .add({
        targets: logoImage,
        opacity: [1, 0],
        scaleX: logoImage.scaleX + 0.2,
        scaleY: logoImage.scaleY + 0.2,
        easing: 'easeOutCubic',
        duration: 500,
        delay: 2500,
        complete: () => console.log('complete 5')
      })
      .add({
        delay: 1000,
        targets: [mask, logoImage],
        opacity: 0,
        duration: 10,
        complete: () => console.log('complete 6')
      })
      .add({
        targets: [titleText, subtitleText],
        opacity: 1,
        duration: 10,
        complete: () => {
          // Reset
          console.log('complete 7 final')
          animTimeline = null
          clearInterval(interval)
          logoImage.scaleX = orig.logoScaleX
          logoImage.scaleY = orig.logoScaleY
          titleText.top = orig.titleTextTop
          subtitleText.top = orig.subtitleTextTop
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
    canvas.requestRenderAll()
  }

  // Update background
  $: $bg, updateBg()

  function updateBg() {
    if (!canvas) return
    canvas.set('backgroundColor', $bg)
    mask.set('fill', $bg)
    canvas.requestRenderAll()
  }

  // Update background image
  $: $bgImage, updateBgImage()
  $: $bgOpacity, updateBgImageOpacity()

  function updateBgImage() {
    console.log('updateBgImage')

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
      canvas.requestRenderAll()
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
        originY: 'center',
        opacity: 0
      })
      img.scaleToWidth(200)
      img.id = 'logoImage'
      canvas.centerObject(img)
      canvas.insertAt(img, layers.LOGO)
    })
  }

  // Record
  export async function record() {
    // reset()
    play()
    $video = null
    console.log('record called')

    const canvas = document.getElementById('canvas')
    const videoStream = canvas.captureStream(60)
    const mediaRecorder = new MediaRecorder(videoStream, {
      videoBitsPerSecond: 5000000 // Double the default quality from 2.5Mbps to 5Mbps
    })

    let chunks = []

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = function (e) {
      const blob = new Blob(chunks, { type: 'video/mp4' })
      chunks = []
      const videoURL = URL.createObjectURL(blob)
      $video = videoURL
    }
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data)
    }

    mediaRecorder.start()
    setTimeout(function () {
      mediaRecorder.stop()
      $recording = false
    }, animTimeline.duration - 1000)
  }
</script>

<section class="wrapper">
  <canvas width={canvasSize} height={canvasSize} id="canvas" />
</section>

<style lang="scss">
  .wrapper {
    position: sticky;
    top: var(--size-9);
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
  }
  canvas {
    border-radius: var(--radius-2);
    overflow: hidden;
  }
</style>
