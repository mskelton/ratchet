<script>
  import { onMount } from "svelte"
  import { CodeMirror } from "./editor/codemirror.js"
  import { options } from "./editor/options"

  export let defaultValue
  const refs = {}

  onMount(() => {
    const editor = CodeMirror.fromTextArea(refs.editor, options)
  })
</script>

<style>
  .container {
    display: flex;
    flex: 1;
  }

  .editor {
    display: flex;
    flex: 1;
  }
</style>

<div class="container">
  <div class="editor">
    <!-- svelte-ignore a11y-positive-tabindex -->
    <textarea
      tabindex="2"
      bind:this={refs.editor}
      readonly
      value={defaultValue} />
  </div>
</div>
