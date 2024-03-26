<script lang="ts">
	import Taxon from '$lib/components/Taxon.svelte';
	import { getTaxonData } from '$lib/pocketBase';
	import { setContext } from 'svelte';
	import type { Snapshot } from './$types';
	import { writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';

	export let data;

	const currentTaxon = writable<string>('');
	const numberSteps = writable<number>(0);
	setContext('currentTaxon', currentTaxon);
	setContext('numberSteps', numberSteps);

	let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>> | null = null;
	export const snapshot: Snapshot<GameContext> = {
		capture: () => {
			return { currentTaxon: $currentTaxon, steps: $numberSteps };
		},
		restore: async (value) => {
			if (!value.currentTaxon) value = { currentTaxon: 'Q729___________', steps: 0 };
			currentTaxon.set(value.currentTaxon);
			numberSteps.set(value.steps);
			currentTaxonData = await getTaxonData($currentTaxon);
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		currentTaxonData = await getTaxonData($currentTaxon);
	};
</script>

<h1>Goal Taxon</h1>
<p>The record is {data.taxon.scientific}, {data.taxon.vernacular}</p>
<p>{data.description}</p>
<p>Rank: {data.taxon.rank}</p>
<img height={200} src={data.taxon.image_link} alt={data.taxon.scientific} />
<h1>Current Taxon</h1>
<button on:click={() => reset()}>Reset</button>
<p>Number of current steps : {$numberSteps}</p>
{#if currentTaxonData !== null}
	<Taxon data={currentTaxonData} />
{/if}
