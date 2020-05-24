<script>
  import { afterUpdate, createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()
  let preservePropTypes = false

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

  input {
    margin-right: 8px;
    margin-top: 2px;
  }
</style>

<div class="container">
  <h1>PropTypes to TS</h1>

  <label>
    <input type="checkbox" bind:checked={preservePropTypes} data-testid="preserve-prop-types" />
    Preserve PropTypes
  </label>
</div>
