<script>
  export let searchAsYouType = false;
  let value = '';

  function updateValue(e) {
    value = e.target.value;
    searchAsYouType && search();
  }

  function onKeyDown(e) {
    e.key === 'Enter' && search();
  }
  
  function search() {
    console.log(`your value is ${value}`)
  }
</script>

<div>
	<input on:input={updateValue} on:keydown={onKeyDown}/>
</div>

<style>
</style>