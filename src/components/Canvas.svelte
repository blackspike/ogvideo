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

  let video, canvas, titleText, subtitleText, outroGroup, animTimeline

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
    BOTTOM: 1,
    MIDDLE: 2,
    TOP: 3
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
    canvas.insertAt(subtitleText, layers.MIDDLE)

    // Title
    titleText = new fabric.Textbox($title, {
      ...textDefaults,
      fontSize: $sizeTitle,
      top: canvasSize - 80 - subtitleText.calcTextHeight()
    })

    canvas.insertAt(titleText, layers.MIDDLE)

    // Update fonts
    canvas.set('fontFamily', font)
    canvas.requestRenderAll()

    // Add outro

    const outroRect = new fabric.Rect({
      fill: $bgOutro,
      width: canvasSize,
      height: canvasSize
    })
    outroRect.id = 'outroRect'

    outroGroup = new fabric.Group([outroRect])
    outroGroup.opacity = 0
    canvas.insertAt(outroGroup, layers.TOP)

    // Add logo image
    fabric.Image.fromURL($logoImage, (img) => {
      img.set({
        originX: 'center',
        originY: 'center'
      })
      img.scaleToHeight(canvasSize / 4)
      img.id = 'logoImage'
      outroGroup.add(img)
    })

    // Animate
    // targets: canvas.getObjects().find((o) => o.id === 'thing'),
    animTimeline = anime.timeline({
      autoplay: false
    })
    animTimeline
      .add({
        targets: titleText,
        top: '-=30',
        easing: 'easeOutQuad',
        duration: 1000,
        update: function () {
          canvas.renderAll()
        },

        begin: () => {
          titleText.set('text', '')
          let count = $title.length
          let cur = 0
          let t = ''
          setInterval(() => {
            if (cur >= count) return
            titleText.set('text', (t += $title[cur]))
            cur++
          }, 20)
        }
      })
      .add({
        targets: outroGroup,
        opacity: [0, 1],
        easing: 'linear',
        duration: 1000,
        update: function () {
          canvas.renderAll()
        },
        begin: () => {
          console.log('playyy')
          console.log(outroGroup)
        }
      })
      .add({
        targets: outroGroup.getObjects().find((obj) => obj.id === 'logoImage'),
        opacity: [0, 1],
        easing: 'linear',
        duration: 1000,
        update: function () {
          canvas.renderAll()
        },
        begin: () => {
          console.log('playyy')
          console.log(outroGroup)
        }
      })
    console.log(titleText)

    // animTimeline = anime.timeline({
    //   easing: 'easeOutExpo',
    //   autoplay: false,
    //   loop: true,
    //   direction: 'alternate',
    //   update: function () {
    //     canvas.renderAll()
    //   },
    //   begin: () => {
    //     console.log('playyy')
    //     console.log(outroGroup)
    //   },
    //   targets: outroGroup,
    //   opacity: 1,
    //   duration: 1000,
    //   update: function () {
    //     canvas.renderAll()
    //   }
    // })
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
      canvas.insertAt(img, layers.BOTTOM)
      console.log(canvas.getObjects())
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
    const currentImage = outroGroup.getObjects().find((obj) => obj.id === 'logoImage')
    outroGroup.remove(currentImage)

    fabric.Image.fromURL($logoImage, (img) => {
      img.set({
        originX: 'center',
        originY: 'center',
        opacity: 0
      })
      img.scaleToHeight(canvasSize / 4)
      img.id = 'logoImage'
      outroGroup.add(img)
    })
  }

  // Add children
  // animTimeline.add({
  //   targets: outroGroup,
  //   opacity: 1,
  //   duration: 1000,
  //   update: function () {
  //     canvas.renderAll()
  //   }
  // })
  // .add({
  //   targets: outroGroup?.getObjects().find((obj) => obj.id === 'logoImage'),
  //   opacity: 1,
  //   duration: 1000
  // })
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
  <button on:click={animTimeline.play()}>Play</button>
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
