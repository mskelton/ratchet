<script>
  import Editor from "./components/Editor.svelte"
  import ConfigBar from "./components/ConfigBar.svelte"
  import { inputSnippet, outputSnippet } from "./editor/snippets"
  import transform from "../transform"
  // import jscodeshift from "jscodeshift/src/core"

  const options = {}

  function handleChange(event) {
    // console.log(jscodeshift)
    // const output = transform(
    //   { source: event.detail.value },
    //   { jscodeshift },
    //   options
    // )
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
