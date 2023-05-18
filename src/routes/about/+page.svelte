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
      <h2>FAQ</h2>
      <dl class="vstack gap-4">
        <div class="vstack gap-2">
          <dt>The url import didn't work</dt>
          <dd>Yeah, it only works like 50% of the time. Hobby project!</dd>
        </div>

        <div class="vstack gap-2">
          <dt>There's a weird bug</dt>
          <dd>Try reloading the page!</dd>
        </div>

        <div class="vstack gap-2">
          <dt>I have a suggestion/question/abusive message</dt>
          <dd>
            Ping us on <a href="https://mastodon.cloud/@blackspike">mastodon</a> or at
            <a href="http://www.blackspike.com">blackspike.com</a>
          </dd>
        </div>
      </dl>
    </section>

    <!-- footer -->
    <footer class=" controls__footer">
      <Footer />
    </footer>
    <footer class="vstack gap-3">
      <p><a class="btn" href="/">← Cool</a></p>
    </footer>
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
    font-size: var(--font-size-2);
    font-weight: var(--font-weight-4);
    line-height: var(--font-lineheight-2);
  }
  dl {
    margin-block: var(--size-3);
  }
  dt {
    font-size: var(--font-size-3);
  }
  p,
  dd {
    font-family: 'Inter';
  }
</style>
