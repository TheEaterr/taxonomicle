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
	import ResetButton from '$lib/components/ResetButton.svelte';

	export let data;

	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const numberSteps = getContext<Writable<number>>('numberSteps');
	const goalTaxonId = getContext<Writable<string>>('goalTaxon');
	const gameStarted = getContext<Writable<boolean>>('gameStarted');

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
			console.log('restoring...');
			if (!value.currentTaxon || !value.goalTaxon) {
				value = {
					currentTaxon: 'Q729___________',
					steps: 0,
					goalTaxon: ''
				};
			}
			currentTaxon.set(value.currentTaxon);
			goalTaxonId.set(value.goalTaxon);
			numberSteps.set(value.steps);
			if ($numberSteps > 0) {
				$gameStarted = true;
			}
			goalTaxonData = await getGoalTaxonData(value.goalTaxon);
			currentTaxonData = await getTaxonData($currentTaxon, goalTaxonData.taxon.path);
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		goalTaxonData = await getRandomGoalTaxon();
		currentTaxonData = await getTaxonData($currentTaxon, goalTaxonData.taxon.path);
		goalTaxonId.set(goalTaxonData.taxon.id);
		$gameStarted = false;
	};
</script>

<ResetButton {reset} />
{#if goalTaxonData && currentTaxonData}
	<Game {goalTaxonData} {currentTaxonData} />
{/if}
