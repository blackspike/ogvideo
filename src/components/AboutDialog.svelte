<script>
  let open = false
  export let openDialog = () => (open = true)
</script>

<h1>{open}</h1>
<dialog id="dialog-about" class="panel" {open}>
  <form method="dialog" class="content vstack gap-3">
    <section class="vstack gap-3">
      <h2>WTF is OG Video</h2>
      <p>
        Enter your blog post url and it'll try and grab the meta title, description and share image, and let you create and export an animated video for your
        socials!
      </p>
    </section>

    <!-- Faq -->
    <section class="vstack gap-3">
      <h2>FAQ</h2>
      <dl class="vstack gap-2">
        <div class="panel vstack gap-2">
          <dt>Demo? Who made this? Where's the code at?</dt>
          <dd>
            <a class="credits" href="/demo.mp4">Example Video</a> ::
            <a class="credits" href="https://www.blackspike.com">by blackspike.com</a> ::
            <a class="credits" href="https://github.com/blackspike/ogvideo">Source on GitHub</a>
          </dd>
        </div>

        <div class="panel vstack gap-2">
          <dt>The url import didn't work</dt>
          <dd>Yeah, it only works like 50% of the time. Hobby project!</dd>
        </div>

        <div class="panel vstack gap-2">
          <dt>There's a weird bug</dt>
          <dd>Try reloading the page!</dd>
        </div>

        <div class="panel vstack gap-2">
          <dt>Can I add posts via query parameter</dt>
          <dd>
            <p>Why yes! Just add <code>?url=https://yoursite.com</code> to the url</p>

            <p>
              <a href="https://ogvideo.app/?url=https://www.bbc.co.uk/news/business-65644340">ogvideo.app/?url=https://bbc.co.uk</a>
            </p>
            <p>
              <a href="https://ogvideo.app/?url=https://www.theonion.com/if-pigs-are-so-smart-why-won-t-they-debate-me-1850447712"
                >ogvideo.app/?url=https://theonion.com</a
              >
            </p>
          </dd>
        </div>

        <div class="panel vstack gap-2">
          <dt>I'd prefer an <code>MP4</code> rather than a <code>WEBM</code></dt>
          <dd>Me too buddy! Blame the suits. A workaround is to run this app in Safari.</dd>
        </div>

        <div class="panel vstack gap-2">
          <dt>There are horizontal scrollbars on mobile, for shame.</dt>
          <dd>I know ☹️ – not very responsive of us. Hobby project!</dd>
        </div>

        <div class="panel vstack gap-2">
          <dt>I have a suggestion/question/abusive message</dt>
          <dd>
            Ping us on <a href="https://mastodon.cloud/@blackspike">mastodon</a> or at
            <a href="http://www.blackspike.com">blackspike.com</a>
          </dd>
        </div>
      </dl>
    </section>

    <footer class="hstack gap-3">
      <button value="cancel">← Cool</button>
    </footer>
  </form>
</dialog>

<style>
  .content {
    max-width: 40rem;
    font-size: var(--font-size-1);
    font-weight: var(--font-weight-4);
    line-height: var(--font-lineheight-3);
    padding-block: var(--size-1);
  }
  .content .panel {
    background-color: var(--gray-10);
  }

  dt {
    font-size: var(--font-size-3);
  }

  p,
  dd {
    font-family: 'Inter';
    color: var(--gray-3);
  }
</style>
