<script>
  import Footer from '../../components/Footer.svelte'
</script>

<div class="container">
  <main class="panel about vstack gap-7">
    <section class="vstack gap-3">
      <h2>What is OG Video</h2>
      <p>
        Enter your blog post url and it'll try and grab the meta tags and allow you to export an
        animated video for your socials!
      </p>
    </section>

    <section class="vstack gap-3">
      <h2><a href="/">← Cool.</a></h2>
    </section>

    <!-- footer -->
    <section class=" controls__footer">
      <Footer />
    </section>
  </main>
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;
  }
  main {
    inline-size: min(90vw, 40rem);
    margin-inline: auto;
    padding: 3vw;
    font-size: var(--font-size-4);
    line-height: var(--font-lineheight-2);
  }
</style>
