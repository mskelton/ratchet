<script>
  import { createEventDispatcher, onMount } from "svelte"
  import { CodeMirror } from "../editor/codemirror.js"
  import { options } from "../editor/options"
  import { debounce } from "../utils"

  // Props
  export let defaultValue
  export let readOnly = false

  const dispatch = debounce(createEventDispatcher(), 1000)
  const refs = {}

  // State
  let editor

  onMount(() => {
    if (editor) return
    editor = CodeMirror.fromTextArea(refs.editor, { ...options, readOnly })

    editor.on("change", instance => {
      dispatch("change", { value: instance.getValue() })
    })
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
