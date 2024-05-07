<script lang="ts">
	import FixedTaxonPage from '$lib/components/FixedTaxonPage.svelte';
	import { getContext } from 'svelte';
	import { type Snapshot } from '@sveltejs/kit';
	import type { GameContext } from '$lib/gameContext';

	export let data;

	export const snapshot = getContext<Snapshot<GameContext | undefined>>('fixedSnapshot');
</script>

<svelte:head>
	<title>{data.goalTaxon.scientific} - Custom - Taxonomicle</title>
	<meta
		name="description"
		content="Try and find a random species in the tree of life. Learn some taxonomy facts along the way."
	/>
</svelte:head>

<FixedTaxonPage goalTaxonData={data.goalTaxon} animaliaTaxon={data.animaliaTaxon} isDaily={false} />
