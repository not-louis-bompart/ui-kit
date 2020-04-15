<script>
  import { response } from '../headless/store.ts';
  // import { onDestroy } from 'svelte';
  // let results = [];
  // const unsubscribe = response.subscribe(res => results = res);
  // onDestroy(unsubscribe);
</script>

<style>
  .result {
    margin: 16px 0;
  }
</style>


<svelte:options tag="result-list"/>
<div>
{#each $response as result}
  <div class="result"><a href="{result.clickUri}">{result.title}</a></div>
{/each}
</div>
