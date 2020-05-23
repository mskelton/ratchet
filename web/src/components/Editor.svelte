<script>
  import { createEventDispatcher, afterUpdate, onMount } from "svelte"
  import { CodeMirror } from "../editor/codemirror.js"
  import { options } from "../editor/options"
  import { debounce } from "../utils"

  export let readOnly = false
  export let testId
  export let value
  let editor

  const dispatch = debounce(createEventDispatcher(), 200)
  const refs = {}

  onMount(() => {
    if (editor) return

    editor = CodeMirror.fromTextArea(refs.editor, {
      ...options,
      readOnly,
    })

    // Attach the editor to the window so we can test it
    if (!window.editor) window[testId] = editor

    editor.on("change", (instance) => {
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
  <div class="editor" data-testid={testId}>
    <!-- svelte-ignore a11y-positive-tabindex -->
    <textarea bind:this={refs.editor} readonly tabindex="2" {value} />
  </div>
</div>
