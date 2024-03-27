<script lang="ts">
	import Taxon from '$lib/components/Taxon.svelte';
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';

	export let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>>;
	export let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>>;

	const numberSteps = getContext<Writable<number>>('numberSteps');
	const currentTaxon = getContext<Writable<string>>('currentTaxon');

	const updateCurrentTaxon = async (newId: string) => {
		currentTaxon.set(newId);
		numberSteps.update((n) => n + 1);
		currentTaxonData = await getTaxonData(newId, goalTaxonData.taxon.path);
	};

	let isGoalReached = false;
	$: isGoalReached = currentTaxonData.children.items.some(
		(child) => child.id === goalTaxonData.taxon.id
	);
</script>

<h1>Goal Taxon</h1>
<p>The record is {goalTaxonData.taxon.scientific}, {goalTaxonData.taxon.vernacular}</p>
<p>{goalTaxonData.description}</p>
<img height={200} src={goalTaxonData.taxon.image_link} alt={goalTaxonData.taxon.scientific} />
<h1>Current Taxon</h1>
<p>Number of current steps : {$numberSteps}</p>
{#if !isGoalReached}
	<Taxon data={currentTaxonData} update={updateCurrentTaxon} />
{:else}
	<p>
		Parent: <button on:click={() => updateCurrentTaxon(currentTaxonData.taxon.parent)}
			>{currentTaxonData.taxon.parent}</button
		>
	</p>
	<p>Goal reached!</p>
{/if}
