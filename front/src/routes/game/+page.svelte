<script lang="ts">
	import Taxon from '$lib/components/Taxon.svelte';
	import { getTaxonData } from '$lib/pocketBase';
	import { setContext } from 'svelte';
	import type { Snapshot } from './$types';
	import { writable } from 'svelte/store';
	import type { GameContext } from '$lib/gameContext';

	const currentTaxon = writable<string>();
	const numberSteps = writable<number>();
	setContext('currentTaxon', currentTaxon);
	setContext('numberSteps', numberSteps);

	let data: Awaited<ReturnType<typeof getTaxonData>> | null = null;
	export const snapshot: Snapshot<GameContext> = {
		capture: () => {
			return { currentTaxon: $currentTaxon, steps: $numberSteps };
		},
		restore: async (value) => {
			if (!value.currentTaxon) value = { currentTaxon: 'Q729___________', steps: 0 };
			currentTaxon.set(value.currentTaxon);
			numberSteps.set(value.steps);
			data = await getTaxonData($currentTaxon);
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(0);
		data = await getTaxonData($currentTaxon);
	};
</script>

<button on:click={() => reset()}>Reset</button>
{#if data !== null}
	<Taxon {data} />
{/if}
