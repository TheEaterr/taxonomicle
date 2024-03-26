<script lang="ts">
	import {
		getGoalTaxon,
		getGoalTaxonData,
		getRandomGoalTaxon,
		getTaxonData
	} from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import type { Snapshot } from './$types';
	import { type Writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';
	import Game from '$lib/components/Game.svelte';

	export let data;

	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const numberSteps = getContext<Writable<number>>('numberSteps');
	const goalTaxonId = getContext<Writable<string>>('goalTaxon');

	let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>> = data.goalTaxon;
	let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>> = data.animaliaTaxon;
	currentTaxon.set('Q729___________');
	numberSteps.set(0);
	goalTaxonId.set(goalTaxonData.taxon.id);

	export const snapshot: Snapshot<GameContext> = {
		capture: () => {
			return { currentTaxon: $currentTaxon, steps: $numberSteps, goalTaxon: $goalTaxonId };
		},
		restore: async (value) => {
			if (!value.currentTaxon)
				value = {
					currentTaxon: 'Q729___________',
					steps: 0,
					goalTaxon: ''
				};
			currentTaxon.set(value.currentTaxon);
			numberSteps.set(value.steps);
			currentTaxonData = await getTaxonData($currentTaxon);
			if (!value.goalTaxon) {
				goalTaxonData = await getRandomGoalTaxon();
				goalTaxonId.set(goalTaxonData.taxon.id);
			} else {
				goalTaxonData = await getGoalTaxonData(value.goalTaxon);
			}
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		currentTaxonData = await getTaxonData($currentTaxon);
		goalTaxonData = await getRandomGoalTaxon();
		goalTaxonId.set(goalTaxonData.taxon.id);
	};
</script>

<button on:click={() => reset()}>Reset</button>

{#if goalTaxonData && currentTaxonData}
	<Game {goalTaxonData} {currentTaxonData} />
{/if}
