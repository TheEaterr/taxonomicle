<script lang="ts">
	import { getTaxonData } from '$lib/pocketBase';
	import Taxon from './Taxon.svelte';

	export let data: Awaited<ReturnType<typeof getTaxonData>>;
	export let update: (newId: string) => Promise<void>;
</script>

<div class="flex">
	<Taxon {data} isGoal={false} />
	<p>
		Parent: <button on:click={() => update(data.taxon.parent)} class="btn"
			>{data.taxon.parent}</button
		>
	</p>
	<p>Overflow: {data.overflown}</p>
	<ul>
		{#each data.children.items as child}
			<li>
				{child.scientific}, {child.vernacular}, {child.expand?.rank.name},
				<button on:click={() => update(child.id)} class="btn">{child.id}</button>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
