<script>
  import { HeadlessSearchbox } from '../headless/search-box.ts';
  
  export let searchAsYouType = false;
  const headlessSearchbox = new HeadlessSearchbox({ searchAsYouType })

  function updateValue(e) {
    headlessSearchbox.text = e.target.value;
  }

  function onKeyDown(e) {
    e.key === 'Enter' && headlessSearchbox.search();;
  }
</script>


<svelte:options tag='search-box' accessors={true}/>
<div>
	<input on:input={updateValue} on:keydown={onKeyDown}/>
</div>