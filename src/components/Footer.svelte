<footer>
  <slot />
</footer>

<style>
  footer {
    display: flex;
    gap: var(--size-3);
    flex-direction: column;
  }
  @media screen and (min-width: 45rem) {
    footer {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
