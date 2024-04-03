<script lang="ts">
	import type { getGoalTaxon } from '$lib/pocketBase';

	export let data: Awaited<ReturnType<typeof getGoalTaxon>>;
	export let isGoal: boolean;
</script>

<div class="card m-5 min-w-[90%] bg-base-200 shadow-md min-[550px]:min-w-[500px] lg:max-w-[938px]">
	<figure class="m-0 max-h-96" style="background-image: url('{data.taxon.image_link}')">
		<div class="glass flex w-full flex-col items-center">
			<img src={data.taxon.image_link} alt={data.taxon.scientific} class="max-h-96 w-auto" />
		</div>
	</figure>
	<div class="card-body flex-row">
		<!-- Allows for the description text to limit itself to the wdith of the image. -->
		<div class="w-0 grow text-left">
			<div>
				<h2 class="card-title">
					<div class="badge badge-primary badge-lg font-bold">Scientific</div>
					<div class="mb-1 italic">
						{data.taxon.scientific}
					</div>
				</h2>
				{#if data.taxon.vernacular}
					<div class="badge badge-secondary font-bold">Vernacular</div>
					<span class="font-semibold">
						{data.taxon.vernacular}
					</span>
				{/if}
				{#if !isGoal}
					<div class="font-accent-content badge badge-accent font-bold">Rank</div>
					<span class="font-semibold">
						{data.taxon.expand?.rank.name}
					</span>
				{/if}
				<div>
					{data.descriptions[data.taxon.site_link]}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
