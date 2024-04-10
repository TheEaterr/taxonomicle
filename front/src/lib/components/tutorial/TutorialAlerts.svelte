<script lang="ts">
	import TutorialAlert from '$lib/components/tutorial/TutorialAlert.svelte';

	export let currentTaxonId: string;
	export let path: string[];
</script>

{#if currentTaxonId === path[0]}
	<TutorialAlert>
		You are now a the root of the tree. Notice the information about the current taxon (here
		animalia) above this notice. During the game, you will need to compare this information with the
		goal taxon to verify you are in the right track!
		<br />
		Now the first step should be quite easy. You have to click on one of the two options below. In black
		is the scientific name of the taxon and in grey is the common name (if it exists).
		<br />
		<div class="text-sm text-neutral">
			Hint: the fish we are dealing with is a fish and not a sponge!
		</div>
	</TutorialAlert>
{:else}
	<TutorialAlert isWarning>
		Uh-oh! I'm afraid you deviated from the right path 😿.
		<br />
		Climb back up the tree until this message disappears!
	</TutorialAlert>
{/if}
