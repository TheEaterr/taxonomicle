<script lang="ts">
	import FixedTaxonPage from '$lib/components/FixedTaxonPage.svelte';

	export let data;
</script>

<FixedTaxonPage goalTaxonData={data.goalTaxon} animaliaTaxon={data.animaliaTaxon} />
