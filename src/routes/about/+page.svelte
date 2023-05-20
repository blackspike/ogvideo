<div class="container">
  <main class="panel about vstack gap-7">
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

    <footer class="vstack gap-3">
      <p><a class="btn" href="/">← Cool</a></p>
    </footer>
  </main>
</div>

<style>
  .container {
    width: 100%;
    display: grid;
    place-content: center;
  }
  .container:after {
    background-image: url('/temp.webp');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    opacity: 0.3;
  }
  main {
    inline-size: min(90vw, 45rem);
    margin-inline: auto;
    margin-block: var(--size-fluid-5);
    padding: 2vw;
    font-size: var(--font-size-1);
    font-weight: var(--font-weight-4);
    line-height: var(--font-lineheight-3);
    z-index: 3;
    box-shadow: var(--shadow-6);
  }
  dt {
    font-size: var(--font-size-3);
  }
  p,
  dd {
    font-family: 'Inter';
    color: var(--gray-3);
  }
  main .panel {
    background-color: var(--gray-10);
  }
  a {
    text-decoration: none;
  }
  .credits {
    width: 100%;
  }
</style>
