<script>
  import Editor from "./components/Editor.svelte"
  import ConfigBar from "./components/ConfigBar.svelte"
  import { inputSnippet, outputSnippet } from "./editor/snippets"
  import transform from "../../transform"
  import jscodeshift from "jscodeshift"

  let options = {}
  let output = outputSnippet

  function handleOptionChange(event) {
    options = {
      "preserve-prop-types": event.detail.preservePropTypes
    }
  }

  function handleChange(event) {
    output = transform({ source: event.detail.value }, { jscodeshift }, options)
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
  <ConfigBar on:change={handleOptionChange} />

  <div class="editors">
    <Editor value={inputSnippet} on:change={handleChange} />
    <Editor value={output} readOnly />
  </div>
</div>
