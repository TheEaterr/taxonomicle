<script lang="ts">
	import { getTaxonData } from '$lib/pocketBase';
	import Taxon from '$lib/components/taxon/Taxon.svelte';
	import TaxonButton from '$lib/components/taxon/TaxonButton.svelte';

	export let data: Awaited<ReturnType<typeof getTaxonData>>;
	export let update: (newId: string) => Promise<void>;
</script>

<div class="flex gap-5">
	<Taxon {data} isGoal={false} />
	<div>
		<p>
			Parent: <button
				on:click={() => update(data.taxon.parent)}
				class="btn bg-kingdom text-kingdom-content">{data.taxon.parent}</button
			>
		</p>
		<p>Overflow: {data.overflown}</p>
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
</div>

<style>
</style>
