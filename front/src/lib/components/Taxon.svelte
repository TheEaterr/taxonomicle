<script lang="ts">
	import { getTaxonData } from '$lib/pocketBase';

	export let data: Awaited<ReturnType<typeof getTaxonData>>;

	const changeTaxon = async (newId: string) => {
		data = await getTaxonData(newId);
	};
</script>

<p>The record is {data.taxon.scientific}, {data.taxon.vernacular}</p>
<p>{data.description}</p>
<p>Rank: {data.taxon.rank}</p>
<p>
	Parent: <button on:click={() => changeTaxon(data.taxon.parent)}>{data.taxon.parent}</button>
</p>
<img height={200} src={data.taxon.image_link} alt={data.taxon.scientific} />
<ul>
	{#each data.children.items as child}
		<li>
			{child.scientific}, {child.vernacular}, {child.rank},
			<button on:click={() => changeTaxon(child.id)}>{child.id}</button>
		</li>
	{/each}
</ul>

<style>
</style>
