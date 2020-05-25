<script>
  import jscodeshift from "jscodeshift"
  import { onMount } from "svelte"
  import transform from "../../transform"
  import Editor from "./components/Editor.svelte"
  import Header from "./components/Header.svelte"
  import { inputSnippet } from "./editor/snippets"
  import { storage } from "./storage"

  const source = { current: inputSnippet }
  let output = doTransform(source.current)

  function doTransform(source) {
    return transform(
      { source },
      { jscodeshift },
      { "preserve-prop-types": storage["preserve-prop-types"] }
    )
  }

  function handleOptionChange() {
    // Since the options have changed, we need to re-compile the source
    output = doTransform(source.current)
  }

  function handleChange(event) {
    // Store the source for use if the options are changed
    source.current = event.detail.value
    output = doTransform(source.current)
  }
</script>

<style>
  .container,
  .editors {
    display: flex;
    height: 100%;
  }

  .container {
    flex-direction: column;
  }

  .editors {
    flex: 1;
    min-height: 0;
  }
</style>

<div class="container">
  <Header on:change={handleOptionChange} />

  <div class="editors">
    <Editor testId="input" value={inputSnippet} on:change={handleChange} />
    <Editor testId="output" value={output} readOnly />
  </div>
</div>
