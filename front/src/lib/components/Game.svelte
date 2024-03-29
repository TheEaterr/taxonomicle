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
	const gameStarted = getContext<Writable<boolean>>('gameStarted');

	const updateCurrentTaxon = async (newId: string) => {
		currentTaxon.set(newId);
		numberSteps.update((n) => n + 1);
		currentTaxonData = await getTaxonData(newId, goalTaxonData.taxon.path);
	};

	let isGoalReached = false;
	$: isGoalReached =
		currentTaxonData.id === goalTaxonData.taxon.path[goalTaxonData.taxon.path.length - 1];
</script>

<h2 class="small-title mb-3 text-3xl font-bold text-primary">Goal Taxon</h2>
<GoalTaxon data={goalTaxonData} />
{#if !$gameStarted}
	<div class="m-3">
		<button on:click={() => gameStarted.set(true)} class="btn-primary-special btn text-lg"
			>Start</button
		>
	</div>
{:else if !isGoalReached}
	<Taxon data={currentTaxonData} update={updateCurrentTaxon} />
{:else}
	<p>
		Parent: <button on:click={() => updateCurrentTaxon(currentTaxonData.taxon.parent)} class="btn"
			>{currentTaxonData.taxon.parent}</button
		>
	</p>
	<p>Goal reached!</p>
{/if}

<style>
	.small-title {
		-webkit-text-stroke: 1px oklch(var(--nc));
	}
</style>
