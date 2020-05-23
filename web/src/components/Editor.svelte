<script>
  import { createEventDispatcher, afterUpdate, onMount } from "svelte"
  import { CodeMirror } from "../editor/codemirror.js"
  import { options } from "../editor/options"
  import { debounce } from "../utils"

  export let value
  export let readOnly = false
  let editor

  const dispatch = debounce(createEventDispatcher(), 1000)
  const refs = {}

  onMount(() => {
    if (editor) return

    editor = CodeMirror.fromTextArea(refs.editor, {
      ...options,
      readOnly
    })

    editor.on("change", instance => {
      dispatch("change", { value: instance.getValue() })
    })
  })

  afterUpdate(() => {
    editor.setValue(value)
  })
</script>

<style>
  .container {
    display: flex;
    flex: 1;
  }

  .container:first-child {
    border-right: 4px solid #1b2224;
  }

  .editor {
    display: flex;
    flex: 1;
  }
</style>

<div class="container">
  <div class="editor">
    <!-- svelte-ignore a11y-positive-tabindex -->
    <textarea tabindex="2" bind:this={refs.editor} readonly {value} />
  </div>
</div>
