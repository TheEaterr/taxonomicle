<script lang="ts">
	import { getTaxonData } from '$lib/pocketBase';
	import Taxon from '$lib/components/taxon/Taxon.svelte';
	import TaxonButton from '$lib/components/taxon/TaxonButton.svelte';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';

	const numberSteps = getContext<Writable<number>>('numberSteps');

	export let data: Awaited<ReturnType<typeof getTaxonData>>;
	export let update: (newId: string) => Promise<void>;
</script>

<div>
	<h2 class="small-title mb-3 text-3xl font-bold text-secondary">Current Taxon</h2>
	<Taxon {data} isGoal={false} />
</div>
<div class="text-center">
	<p>
		Parent: <button
			on:click={() => update(data.taxon.parent)}
			class="btn bg-kingdom text-kingdom-content">{data.taxon.parent}</button
		>
	</p>
	<p>Overflow: {data.overflown}</p>
	<p>Number steps: {$numberSteps}</p>
	<div class="mt-5 flex h-min flex-wrap justify-center gap-5">
		{#each data.children.items as child}
			<TaxonButton
				scientific={child.scientific}
				vernacular={child.vernacular}
				rank={child.expand?.rank.name ?? ''}
				id={child.id}
				{update}
			/>
		{/each}
	</div>
</div>

<style>
	.small-title {
		-webkit-text-stroke: 1px oklch(var(--nc));
	}
</style>
