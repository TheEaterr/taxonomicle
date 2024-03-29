<script lang="ts">
	import type { getGoalTaxon } from '$lib/pocketBase';

	export let data: Awaited<ReturnType<typeof getGoalTaxon>>;
</script>

<div
	class="card min-w-[90%] max-w-[90%] bg-base-200 shadow-md min-[550px]:min-w-[500px] lg:max-w-[938px]"
>
	<figure class="m-0 max-h-96" style="background-image: url('{data.taxon.image_link}')">
		<div class="glass flex w-full flex-col items-center">
			<img src={data.taxon.image_link} alt={data.taxon.scientific} class="max-h-96 w-auto" />
		</div>
	</figure>
	<div class="card-body flex-row">
		<!-- Allows for the description text to limit itself to the wdith of the image. -->
		<div class="w-0 grow">
			<div>
				<h2 class="card-title">
					<div class="badge badge-primary badge-lg font-bold">Goal</div>
					<div class="italic">
						{data.taxon.scientific}
					</div>
				</h2>
				{#if data.taxon.vernacular}
					<div class="badge badge-secondary font-bold">Vernacular</div>
					<span class="font-semibold">
						{data.taxon.vernacular}
					</span>
				{/if}
				<div>
					{data.description}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
