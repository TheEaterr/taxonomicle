<script lang="ts">
	import { getDailyGoalTaxon, getTaxonData } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import Game from '$lib/components/Game.svelte';
	import Header from '$lib/components/header/Header.svelte';

	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const numberSteps = getContext<Writable<number>>('numberSteps');
	const reset = getContext<() => void>('fixedReset');

	export let goalTaxonData: Awaited<ReturnType<typeof getDailyGoalTaxon>>;
	export let animaliaTaxon: Awaited<ReturnType<typeof getTaxonData>>;
	export let isDaily: boolean = false;
	export let isTutorial: boolean = false;

	currentTaxon.set('Q729___________');
	numberSteps.set(-1);
</script>

<Header {reset} currentTaxonId={$currentTaxon} goalTaxonId={goalTaxonData.id} />
<Game {goalTaxonData} {animaliaTaxon} {isDaily} {isTutorial} />
