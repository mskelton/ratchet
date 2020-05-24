<script>
  import { afterUpdate, createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()
  let optionKey = "option:preserve-prop-types"
  let preservePropTypes = localStorage.getItem(optionKey) || "none"

  afterUpdate(() => {
    dispatch("change", { preservePropTypes })
  })
</script>

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

<div class="container">
  <h1>PropTypes to TS</h1>

  <label>
    <span class="label">Preserve PropTypes:</span>
    <select
      bind:value={preservePropTypes}
      data-testid="preserve-prop-types"
      on:change={() => localStorage.setItem(optionKey, preservePropTypes)}>
      <option value="none">None</option>
      <option value="unconverted">Unconverted</option>
      <option value="all">All</option>
    </select>
  </label>
</div>
