<script lang="ts">
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import type { Snapshot } from './$types';
	import { type Writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';
	import Game from '$lib/components/Game.svelte';

	export let data;

	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const numberSteps = getContext<Writable<number>>('numberSteps');

	let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>> = data.animaliaTaxon;
	let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>> = data.goalTaxon;
	currentTaxon.set('Q729___________');
	numberSteps.set(0);

	export const snapshot: Snapshot<GameContext> = {
		capture: () => {
			return { currentTaxon: $currentTaxon, steps: $numberSteps, goalTaxon: '' };
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
			currentTaxonData = await getTaxonData($currentTaxon, goalTaxonData.taxon.path);
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		currentTaxonData = await getTaxonData($currentTaxon, goalTaxonData.taxon.path);
	};
</script>

<button on:click={() => reset()} class="btn">Reset</button>

<Game {goalTaxonData} {currentTaxonData} />
