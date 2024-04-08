<script lang="ts">
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { type Snapshot } from '@sveltejs/kit';
	import { type Writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';
	import Game from '$lib/components/Game.svelte';
	import Header from '$lib/components/header/Header.svelte';

	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const numberSteps = getContext<Writable<number>>('numberSteps');
	const gameWon = getContext<Writable<boolean>>('gameWon');

	export let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>>;
	export let animaliaTaxon: Awaited<ReturnType<typeof getTaxonData>>;
	export let isDaily: boolean;

	currentTaxon.set('Q729___________');
	numberSteps.set(0);
	let gameStarted = false;

	export const snapshot: Snapshot<GameContext | undefined> = {
		capture: () => {
			if (!$gameWon) {
				return { currentTaxon: $currentTaxon, steps: $numberSteps, goalTaxon: '' };
			}
		},
		restore: async (value) => {
			if (!value || !value.currentTaxon) {
				value = {
					currentTaxon: 'Q729___________',
					steps: 0,
					goalTaxon: ''
				};
			}
			currentTaxon.set(value.currentTaxon);
			numberSteps.set(value.steps);
			gameStarted = value.steps > 0;
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		gameStarted = false;
		gameWon.set(false);
	};
</script>

<Header {reset} />
<Game {goalTaxonData} {animaliaTaxon} bind:gameStarted {isDaily} />
