<script lang="ts">
	import Taxon from '$lib/components/Taxon.svelte';
	import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';

	export let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>>;
	export let currentTaxonData: Awaited<ReturnType<typeof getTaxonData>>;

	const numberSteps = getContext<Writable<number>>('numberSteps');
</script>

<h1>Goal Taxon</h1>
<p>The record is {goalTaxonData.taxon.scientific}, {goalTaxonData.taxon.vernacular}</p>
<p>{goalTaxonData.description}</p>
<p>Rank: {goalTaxonData.taxon.rank}</p>
<img height={200} src={goalTaxonData.taxon.image_link} alt={goalTaxonData.taxon.scientific} />
<h1>Current Taxon</h1>
<p>Number of current steps : {$numberSteps}</p>
<Taxon data={currentTaxonData} />
