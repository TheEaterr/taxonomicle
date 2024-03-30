<script lang="ts">
	import type { getGoalTaxon } from '$lib/pocketBase';
	import Taxon from './Taxon.svelte';

	export let data: Awaited<ReturnType<typeof getGoalTaxon>>;
</script>

<Taxon {data} isGoal={true} />
