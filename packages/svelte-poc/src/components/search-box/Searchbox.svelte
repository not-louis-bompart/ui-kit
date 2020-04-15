<script>
  export let searchAsYouType = false;
  let value = '';

  function updateValue(e) {
    value = e.target.value;
    searchAsYouType && search();
  }

  function search() {
    console.log(`your value is ${value}`)
  }
</script>

<div>
	<input on:change={updateValue}/>
</div>

<style>
</style>