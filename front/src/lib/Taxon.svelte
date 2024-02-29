<script lang="ts">
    import { Link } from 'svelte-routing';
    import pb, { type Taxon } from '../utils/pocketBase'
  import type { ListResult } from 'pocketbase';
  
    export let id: string
    console.log(id)
    let taxonId: string;
    let taxonPromise: Promise<Taxon>;
    let childrenPromise: Promise<ListResult<Taxon>>;
    $: taxonId = id;
    $: taxonPromise = pb.collection<Taxon>('taxon').getOne(taxonId)
    $: childrenPromise = pb.collection<Taxon>('taxon').getList(1, 50, {
      filter: `parent = "${taxonId}"`,
  });
</script>

{#await taxonPromise}
    <p>...waiting</p>
{:then taxon}
    <p>The record is {taxon.scientific}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
{#await childrenPromise}
    <p>...waiting</p>
{:then children}
    <ul>
    {#each children.items as child}      
        <li>{child.scientific}, {child.vernacular}, {child.rank}, <Link target="_self" to={"taxon/" + child.id}>{child.id}</Link></li>
    {/each}
    </ul>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style>
</style>
  