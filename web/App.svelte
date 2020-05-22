<script>
  let clicked = 0
</script>

<style>
  .grayed {
    opacity: 0.6;
  }
</style>

<div class="container">
  <p class="mdc-typography--body1">
    {#if clicked}
      You've clicked the button {clicked} time{clicked === 1 ? '' : 's'}.
    {:else}
      <span class="grayed">You haven't clicked the button.</span>
    {/if}
  </p>
</div>
