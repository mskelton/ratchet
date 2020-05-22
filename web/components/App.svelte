<script>
  import Editor from "./Editor.svelte"
  import ConfigBar from "./ConfigBar.svelte"
</script>

<style>
  .container {
    height: 100vh;
    width: 100vw;
  }

  .editors {
    display: flex;
    /* flex-direction: column; */
  }
</style>

<div class="container">
  <ConfigBar />

  <div class="editors">
    <Editor />
    <Editor />
  </div>
</div>
