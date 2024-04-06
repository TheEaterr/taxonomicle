<script lang="ts">
	import { getGoalTaxon, getGoalTaxonData, getRandomGoalTaxon } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import type { Snapshot } from './$types';
	import { type Writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';
	import Game from '$lib/components/Game.svelte';
	import Header from '$lib/components/header/Header.svelte';

	export let data;

	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const numberSteps = getContext<Writable<number>>('numberSteps');
	const goalTaxonId = getContext<Writable<string>>('goalTaxon');
	const gameWon = getContext<Writable<boolean>>('gameWon');

	let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>> = data.goalTaxon;
	currentTaxon.set('Q729___________');
	numberSteps.set(0);
	goalTaxonId.set(data.goalTaxon.taxon.id);
	let gameStarted = false;

	export const snapshot: Snapshot<GameContext | undefined> = {
		capture: () => {
			if (!$gameWon) {
				return { currentTaxon: $currentTaxon, steps: $numberSteps, goalTaxon: $goalTaxonId };
			}
		},
		restore: async (value) => {
			if (!value || !value.currentTaxon || !value.goalTaxon) {
				value = {
					currentTaxon: 'Q729___________',
					steps: 0,
					goalTaxon: ''
				};
			} else {
				goalTaxonData = await getGoalTaxonData(value.goalTaxon);
			}
			currentTaxon.set(value.currentTaxon);
			goalTaxonId.set(value.goalTaxon);
			numberSteps.set(value.steps);
			gameStarted = value.steps > 0;
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		goalTaxonData = await getRandomGoalTaxon();
		goalTaxonId.set(goalTaxonData.taxon.id);
		gameStarted = false;
	};
</script>

<Header {reset} />
{#if goalTaxonData}
	<Game {goalTaxonData} animaliaTaxon={data.animaliaTaxon} bind:gameStarted />
{/if}
