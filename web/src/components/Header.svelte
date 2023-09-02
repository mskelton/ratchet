<script>
  import { afterUpdate, createEventDispatcher } from "svelte"
  import { storage } from "../storage.js"

  const dispatch = createEventDispatcher()
  let preservePropTypes = storage["preserve-prop-types"]
  let preferTypeAliases = storage["prefer-type-aliases"] === "true"

  afterUpdate(() => {
    dispatch("change")
  })
</script>

<div class="container">
  <h1>Ratchet</h1>

  <label>
    Prefer Type Aliases
    <input
      bind:checked={preferTypeAliases}
      data-testid="prefer-type-aliases"
      on:change={() => {
        storage["prefer-type-aliases"] = preferTypeAliases
      }}
      type="checkbox"
    />
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
  }

  h1 {
    font-size: 22px;
    margin: 0;
  }

  label {
    display: inline-flex;
    align-items: center;
  }

  .label {
    margin-right: 4px;
  }
</style>
