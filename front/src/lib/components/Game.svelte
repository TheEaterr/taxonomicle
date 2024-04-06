<script lang="ts">
	import TaxonButton from '$lib/components/taxon/TaxonButton.svelte';
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { derived, type Readable, type Writable } from 'svelte/store';
	import GoalTaxon from '$lib/components/taxon/GoalTaxon.svelte';
	import { goto } from '$app/navigation';
	import Taxon from './taxon/Taxon.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	export let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>>;
	export let animaliaTaxon: Awaited<ReturnType<typeof getTaxonData>>;
	export let gameStarted: boolean;

	const numberSteps = getContext<Writable<number>>('numberSteps');
	const currentTaxon = getContext<Writable<string>>('currentTaxon');

	const currentTaxonQuery = createQuery(
		// This typecast is a bit of a hack because having variable initialData
		// make typescript unable to infer the type of the derived function call
		// and thus enable to chose the correct overload. We can simply use the
		// typecast to force the correct overload (for undefined initial data).
		derived(currentTaxon, ($currentTaxon) => ({
			queryKey: ['taxonData', $currentTaxon, goalTaxonData.taxon.path],
			queryFn: () => getTaxonData($currentTaxon, goalTaxonData.taxon.path),
			initialData: $currentTaxon == animaliaTaxon.id ? animaliaTaxon : undefined,
			staleTime: Infinity
		})) as Readable<{
			queryKey: (string | string[])[];
			queryFn: () => ReturnType<typeof getTaxonData>;
			staleTime: number;
		}>
	);

	const updateCurrentTaxon = async (newId: string) => {
		currentTaxon.set(newId);
		numberSteps.update((n) => n + 1);
	};

	let isGoalReached = false;
	$: isGoalReached =
		$currentTaxonQuery.data !== undefined &&
		$currentTaxonQuery.data.id === goalTaxonData.taxon.path[goalTaxonData.taxon.path.length - 1];
</script>

{#if $currentTaxonQuery.isLoading}
	<p>Loading...</p>
{:else if $currentTaxonQuery.isError}
	<p>Error: {$currentTaxonQuery.error.message}</p>
{:else if $currentTaxonQuery.isSuccess}
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
				<Taxon data={$currentTaxonQuery.data} isGoal={false} />
			</div>
		{/if}
	</div>
	{#if gameStarted && !isGoalReached}
		<div class="text-center">
			<div>
				{#if $currentTaxonQuery.data.taxon.expand?.parent !== undefined}
					<div class="relative inline-block h-fit rounded-lg border-2 border-neutral p-1 pt-3">
						<div
							class="absolute left-3 right-6 top-[-15px] w-fit rounded-lg bg-neutral pl-1 pr-1 text-left font-semibold text-neutral-content"
						>
							Parent
						</div>
						<TaxonButton
							scientific={$currentTaxonQuery.data.taxon.expand.parent.scientific}
							vernacular={$currentTaxonQuery.data.taxon.expand.parent.vernacular}
							rank={$currentTaxonQuery.data.taxon.expand.parent.expand?.rank.name ?? ''}
							id={$currentTaxonQuery.data.taxon.parent}
							update={updateCurrentTaxon}
						/>
					</div>
				{/if}
				Number steps: {$numberSteps}
			</div>
			<div
				class="relative m-2 mt-4 flex h-min max-w-full flex-wrap justify-center gap-5 rounded-lg border-2 border-neutral p-1 pt-3"
			>
				<div
					class="absolute left-3 right-6 top-[-15px] w-fit rounded-lg bg-neutral pl-1 pr-1 text-left font-semibold text-neutral-content"
				>
					Choose a child
				</div>
				{#each $currentTaxonQuery.data.children.items as child}
					<TaxonButton
						scientific={child.scientific}
						vernacular={child.vernacular}
						rank={child.expand?.rank.name ?? ''}
						id={child.id}
						update={updateCurrentTaxon}
						description={$currentTaxonQuery.data.descriptions[child.site_link]}
					/>
				{/each}
			</div>
		</div>
	{:else if isGoalReached}
		<p>
			Parent: <button
				on:click={() =>
					updateCurrentTaxon($currentTaxonQuery.data ? $currentTaxonQuery.data.taxon.parent : '')}
				class="btn">{$currentTaxonQuery.data.taxon.parent}</button
			>
		</p>
		<p>Number steps: {$numberSteps}</p>
		<p>Goal reached!</p>
	{/if}
{/if}

<style>
	.small-title {
		-webkit-text-stroke: 1px oklch(var(--nc));
	}
</style>
