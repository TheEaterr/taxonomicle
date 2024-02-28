<script lang="ts">
  import pb, { type Taxon } from './utils/pocketBase'

  const taxonPromise = pb.collection<Taxon>('taxon').getOne('Q729___________')
  const childrenPromise = pb.collection<Taxon>('taxon').getList(1, 50, {
    filter: 'parent = "Q729___________"',
});
</script>

<main>
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
        <li>{child.scientific}, {child.vernacular}, {child.rank}</li>
      {/each}
    </ul>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<style>
</style>
