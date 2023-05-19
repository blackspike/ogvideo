<footer>
  <a class="btn credits" href="/demo.mp4">Example Video</a>
  <a class="btn credits" href="https://github.com/blackspike/ogvideo">Source on GitHub</a>
  <a class="btn credits" href="https://www.blackspike.com">by blackspike.com</a>
</footer>

<style>
  footer {
    display: flex;
    gap: var(--size-3);
    flex-direction: column;
  }
  @media screen and (min-width: 40rem) {
    footer {
      flex-direction: row;
      justify-content: space-between;
    }

    .credits {
      width: 100%;
    }
  }
</style>
