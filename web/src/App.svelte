<script>
  import Editor from "./components/Editor.svelte"
  import ConfigBar from "./components/ConfigBar.svelte"
  import { inputSnippet, outputSnippet } from "./editor/snippets"

  function handleChange(event) {
    console.log(event.detail.value)
  }
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
    <Editor defaultValue={inputSnippet} on:change={handleChange} />
    <Editor defaultValue={outputSnippet} readOnly={true} />
  </div>
</div>
