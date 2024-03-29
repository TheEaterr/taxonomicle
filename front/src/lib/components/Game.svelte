<script lang="ts">
	import Taxon from '$lib/components/Taxon.svelte';
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import GoalTaxon from '$lib/components/GoalTaxon.svelte';

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
	$: isGoalReached =
		currentTaxonData.id === goalTaxonData.taxon.path[goalTaxonData.taxon.path.length - 1];
</script>

<GoalTaxon data={goalTaxonData} />
<h1>Current Taxon</h1>
<p>Number of current steps : {$numberSteps}</p>
{#if !isGoalReached}
	<Taxon data={currentTaxonData} update={updateCurrentTaxon} />
{:else}
	<p>
		Parent: <button on:click={() => updateCurrentTaxon(currentTaxonData.taxon.parent)} class="btn"
			>{currentTaxonData.taxon.parent}</button
		>
	</p>
	<p>Goal reached!</p>
{/if}
