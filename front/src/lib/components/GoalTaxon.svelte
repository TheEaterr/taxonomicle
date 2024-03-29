<script lang="ts">
	import type { getGoalTaxon } from '$lib/pocketBase';

	export let data: Awaited<ReturnType<typeof getGoalTaxon>>;
</script>

<h1>Goal Taxon</h1>
<div class="card glass w-11/12 lg:w-[938px]">
	<figure class="m-0 h-96">
		<img src={data.taxon.image_link} alt={data.taxon.scientific} class="object-cover" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{data.taxon.scientific}, {data.taxon.vernacular}</h2>
		<p>{data.description}</p>
	</div>
</div>
