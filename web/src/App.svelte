<script>
  import jscodeshift from "jscodeshift"
  import transform from "../../transform"
  import Editor from "./components/Editor.svelte"
  import Header from "./components/Header.svelte"
  import { inputSnippet, outputSnippet } from "./editor/snippets"

  const source = { current: inputSnippet }
  let options = {}
  let output = outputSnippet

  function doTransform(source) {
    output = transform({ source }, { jscodeshift }, options)
  }

  function handleOptionChange(event) {
    options = {
      "preserve-prop-types": event.detail.preservePropTypes
    }

    // Since the options have changed, we need to re-compile the source
    doTransform(source.current)
  }

  function handleChange(event) {
    // Store the source for use if the options are changed
    source.current = event.detail.value
    doTransform(source.current)
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
  <Header on:change={handleOptionChange} />

  <div class="editors">
    <Editor value={inputSnippet} on:change={handleChange} />
    <Editor value={output} readOnly />
  </div>
</div>
