<script>
  import Editor from "./Editor.svelte"
  import ConfigBar from "./ConfigBar.svelte"
  import { inputSnippet, outputSnippet } from "./editor/snippets"
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .editors {
    display: flex;
    flex: 1;
  }
</style>

<div class="container">
  <ConfigBar />

  <div class="editors">
    <Editor defaultValue={inputSnippet} />
    <Editor defaultValue={outputSnippet} />
  </div>
</div>
