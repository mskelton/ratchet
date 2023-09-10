<script>
  import { afterUpdate, createEventDispatcher } from "svelte"
  import { storage } from "../storage.js"

  const dispatch = createEventDispatcher()
  let preservePropTypes = storage["preserve-prop-types"]
  let declarationStyle = storage["declaration-style"]

  afterUpdate(() => {
    dispatch("change")
  })
</script>

<div class="container">
  <h1>Ratchet</h1>

  <label>
    <span class="label">Declaration Style:</span>
    <select
      bind:value={declarationStyle}
      data-testid="declaration-style"
      on:change={() => {
        storage["declaration-style"] = declarationStyle
      }}
    >
    <option value="interface">Interface</option>
    <option value="type">Type</option>
    </select>
  </label>
  <label>
    <span class="label">Preserve PropTypes:</span>
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      bind:value={preservePropTypes}
      data-testid="preserve-prop-types"
      on:change={() => {
        storage["preserve-prop-types"] = preservePropTypes
      }}
    >
      <option value="none">None</option>
      <option value="unconverted">Unconverted</option>
      <option value="all">All</option>
    </select>
  </label>
</div>

<style>
  .container {
    align-content: center;
    background-color: #383838;
    border-bottom: 1px solid #1b2224;
    color: #ccc;
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 20px;
  }

  h1 {
    font-size: 22px;
    margin: 0;
    margin-right: auto;
  }

  label {
    display: inline-flex;
    align-items: center;
  }

  .label {
    margin-right: 4px;
  }
</style>
