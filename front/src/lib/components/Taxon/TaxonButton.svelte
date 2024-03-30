<script lang="ts">
	import taxons from '../../taxons.js';
</script>

<div>
	{#each taxons as taxon}
		<button
			class="bg-{taxon} border-{taxon}-content btn text-{taxon}-content hover:bg-{taxon}-content hover:text-{taxon} hover:border-{taxon} relative"
		>
			This is a test
			<div class="absolute bottom-0 right-0 bg-{taxon}">
				{taxon}
			</div>
		</button>
	{/each}
</div>

<style>
</style>
