<script lang="ts">
	import { getDailyGoalTaxon, getGoalTaxonData, getRandomGoalTaxon } from '$lib/pocketBase';
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

	let goalTaxonData: Awaited<ReturnType<typeof getDailyGoalTaxon>> | undefined = data.goalTaxon;
	currentTaxon.set('Q729___________');
	numberSteps.set(-1);
	goalTaxonId.set(data.goalTaxon.id);

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
					steps: -1,
					goalTaxon: ''
				};
			} else {
				goalTaxonData = await getGoalTaxonData(value.goalTaxon);
			}
			currentTaxon.set(value.currentTaxon);
			goalTaxonId.set(value.goalTaxon);
			numberSteps.set(value.steps);
		}
	};

	const reset = async () => {
		numberSteps.set(-1);
		gameWon.set(false);
		// set to undefined before awaiting to get loading indicator
		goalTaxonData = undefined;
		goalTaxonData = await getRandomGoalTaxon();
		// set after awaiting the goal taxon so the query is made
		// with goal taxon data.
		currentTaxon.set('Q729___________');
		goalTaxonId.set(goalTaxonData.id);
	};
</script>

<svelte:head>
	<title>{data.goalTaxon.scientific} - Endless - Taxonomicle</title>
	<meta
		name="description"
		content="Try and find a random species in the tree of life. Learn some taxonomy facts along the way."
	/>
</svelte:head>

<Header {reset} currentTaxonId={$currentTaxon} goalTaxonId={$goalTaxonId} />
<Game {goalTaxonData} animaliaTaxon={data.animaliaTaxon} isDaily={false} />
