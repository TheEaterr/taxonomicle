<script lang="ts">
	import { getTaxonData } from '$lib/pocketBase';

	export let data: Awaited<ReturnType<typeof getTaxonData>>;
	export let update: (newId: string) => Promise<void>;
</script>

<p>The record is {data.taxon.scientific}, {data.taxon.vernacular}</p>
<p>{data.description}</p>
<p>Rank: {data.taxon.expand?.rank.name}</p>
<p>
	Parent: <button on:click={() => update(data.taxon.parent)} class="btn">{data.taxon.parent}</button
	>
</p>
<img
	height={200}
	src={data.taxon.image_link}
	alt={data.taxon.scientific}
	class="ml-auto mr-auto w-96"
/>
<p>Overflow: {data.overflown}</p>
<ul>
	{#each data.children.items as child}
		<li>
			{child.scientific}, {child.vernacular}, {child.expand?.rank.name},
			<button on:click={() => update(child.id)} class="btn">{child.id}</button>
		</li>
	{/each}
</ul>

<style>
</style>
