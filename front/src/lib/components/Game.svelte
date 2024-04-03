<script lang="ts">
	import TaxonButton from '$lib/components/taxon/TaxonButton.svelte';
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import GoalTaxon from '$lib/components/taxon/GoalTaxon.svelte';
	import { goto } from '$app/navigation';
	import Taxon from './taxon/Taxon.svelte';

	export let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>>;
	export let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>>;
	export let gameStarted: boolean;

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

<div class="flex flex-wrap justify-center gap-5 text-center">
	<div>
		<h2 class="small-title mb-3 text-3xl font-bold text-primary">Goal Taxon</h2>
		<GoalTaxon data={goalTaxonData} />
		{#if !gameStarted}
			<div class="m-3">
				<button on:click={() => goto('/tutorial')} class="btn-neutral-special btn btn-sm mr-5"
					>How to play</button
				>
				<button on:click={() => (gameStarted = true)} class="btn-primary-special btn text-lg"
					>Start</button
				>
			</div>
		{/if}
	</div>

	{#if gameStarted && !isGoalReached}
		<div>
			<h2 class="small-title mb-3 text-3xl font-bold text-secondary">Current Taxon</h2>
			<Taxon data={currentTaxonData} isGoal={false} />
		</div>
	{/if}
</div>
{#if gameStarted && !isGoalReached}
	<div class="text-center">
		<p>
			Parent: <button
				on:click={() => updateCurrentTaxon(currentTaxonData.taxon.parent)}
				class="btn bg-kingdom text-kingdom-content">{currentTaxonData.taxon.parent}</button
			>
		</p>
		<p>Overflow: {currentTaxonData.overflown}</p>
		<p>Number steps: {$numberSteps}</p>
		<div class="mt-5 flex h-min flex-wrap justify-center gap-5">
			{#each currentTaxonData.children.items as child}
				<TaxonButton
					scientific={child.scientific}
					vernacular={child.vernacular}
					rank={child.expand?.rank.name ?? ''}
					id={child.id}
					update={updateCurrentTaxon}
					description={currentTaxonData.descriptions[child.site_link]}
				/>
			{/each}
		</div>
	</div>
{:else if isGoalReached}
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
