<script lang="ts">
	import FixedTaxonPage from '$lib/components/FixedTaxonPage.svelte';
	import { getContext } from 'svelte';
	import { type Snapshot } from '@sveltejs/kit';
	import type { GameContext } from '$lib/gameContext';

	export let data;

	export const snapshot = getContext<Snapshot<GameContext | undefined>>('fixedSnapshot');
</script>

<FixedTaxonPage goalTaxonData={data.goalTaxon} animaliaTaxon={data.animaliaTaxon} isDaily={false} />
