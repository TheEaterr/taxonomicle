<script lang="ts">
	import Taxon from '$lib/components/Taxon.svelte';
	import {
		getGoalTaxon,
		getGoalTaxonData,
		getRandomGoalTaxon,
		getTaxonData
	} from '$lib/pocketBase';
	import { setContext } from 'svelte';
	import type { Snapshot } from './$types';
	import { writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';
	import { goto } from '$app/navigation';

	export let data;

	let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>> | null = null;
	$: goalTaxonData = data.goalTaxon;

	const currentTaxon = writable<string>('');
	const goalTaxonId = writable<string>('');
	const numberSteps = writable<number>(0);
	setContext('currentTaxon', currentTaxon);
	setContext('numberSteps', numberSteps);

	let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>> | null = null;
	export const snapshot: Snapshot<GameContext> = {
		capture: () => {
			console.log('capture', $currentTaxon, $numberSteps, $goalTaxonId);
			return { currentTaxon: $currentTaxon, steps: $numberSteps, goalTaxon: $goalTaxonId };
		},
		restore: async (value) => {
			if (!value.currentTaxon) value = { currentTaxon: 'Q729___________', steps: 0, goalTaxon: '' };
			currentTaxon.set(value.currentTaxon);
			numberSteps.set(value.steps);
			currentTaxonData = await getTaxonData($currentTaxon);
			if (data.endless && !value.goalTaxon) {
				goalTaxonData = await getRandomGoalTaxon();
				goalTaxonId.set(goalTaxonData.taxon.id);
			} else if (data.endless) {
				goalTaxonData = await getGoalTaxonData(value.goalTaxon);
			}
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		currentTaxonData = await getTaxonData($currentTaxon);
		if (data.endless) {
			goalTaxonData = await getRandomGoalTaxon();
		}
	};
</script>

<h1>Goal Taxon</h1>
{#if goalTaxonData !== null}
	<p>The record is {goalTaxonData.taxon.scientific}, {goalTaxonData.taxon.vernacular}</p>
	<p>{goalTaxonData.description}</p>
	<p>Rank: {goalTaxonData.taxon.rank}</p>
	<img height={200} src={goalTaxonData.taxon.image_link} alt={goalTaxonData.taxon.scientific} />
{/if}
<h1>Current Taxon</h1>
<button on:click={() => reset()}>Reset</button>
{#if data.endless}
	<button on:click={() => goto('?endless=false')}>Normal mode</button>
{:else}
	<button on:click={() => goto('?endless=true')}>Endless mode</button>
{/if}
<p>Number of current steps : {$numberSteps}</p>
{#if currentTaxonData !== null}
	<Taxon data={currentTaxonData} />
{/if}
