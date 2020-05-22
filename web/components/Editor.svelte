<script context="module">
  let _monaco
  let monaco_promise = import("../editor/monaco.js").then(mod => {
    _monaco = mod.default
  })
</script>

<script>
  import { onMount } from "svelte"
  let monaco
  let container
  let editor

  onMount(() => {
    if (_monaco) {
      monaco = _monaco
      editor = monaco.editor.create(container)
      // createEditor(mode || 'svelte').then(() => {
      // 	if (editor) editor.setValue(code || '');
      // });
    } else {
      monaco_promise.then(async mod => {
        console.log(container)
        monaco = mod.default
        editor = monaco.editor.create(container, {
          value: [
            "from banana import *",
            "",
            "class Monkey:",
            "	# Bananas the monkey can eat.",
            "	capacity = 10",
            "	def eat(self, N):",
            "		'''Make the monkey eat N bananas!'''",
            "		capacity = capacity - N*banana.size",
            "",
            "	def feeding_frenzy(self):",
            "		eat(9.25)",
            '		return "Yum yum"'
          ].join("\n"),
          language: "python"
        })
      })
    }
    return () => {
      destroyed = true
    }
  })
</script>

<div
  class="monaco-container"
  bind:this={container}
  style="height: 500px; text-align: left" />
