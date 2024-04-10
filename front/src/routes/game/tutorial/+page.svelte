<script lang="ts">
	import FixedTaxonPage from '$lib/components/FixedTaxonPage.svelte';
	import { IconInfoCircle } from '@tabler/icons-svelte';
	import { onMount, getContext } from 'svelte';
	import { type Snapshot } from '@sveltejs/kit';
	import type { GameContext } from '$lib/gameContext';

	export let data;

	export const snapshot = getContext<Snapshot<GameContext | undefined>>('fixedSnapshot');

	onMount(() => {
		const tutorialModal: HTMLDialogElement | null = document.getElementById(
			'tutorial-modal'
		) as HTMLDialogElement | null;
		if (tutorialModal) tutorialModal.showModal();
	});
</script>

<dialog id="tutorial-modal" class="modal">
	<div class="modal-box w-11/12 max-w-5xl bg-base-200">
		<h3 class="small-title text-3xl font-bold text-primary">Welcome to Taxonomicle!</h3>
		<hr class="h-[1px] rounded bg-neutral" />
		<div class="text-justify">
			<p class="mt-2 py-2">
				Taxonomicle is a game where you try to find a species by descending the tree of life.
			</p>
			<p class="py-2">
				For this, Taxonomicle uses the field of biology called taxonomy, the scientific study of
				naming, defining and classifying groups of biological organisms based on shared
				characteristics. These groups are called taxa (singular: taxon) and are given a rank to
				build a hierarchy. For Taxonomicle, we start at the kingdom animalia, i.e. the group of all
				animals. Below there are, amidst others, phylum, class, order, family, genus, and species.
			</p>
			<span role="alert" class="alert max-w-screen-lg border-base-300 bg-base-300">
				<IconInfoCircle size={30} class="text-info" />
				<span>
					<span class="inline-block text-justify">
						For example, Vertebrates are a subphylum (i.e. something smaller than a phylum but
						bigger than a class). Contained in the vertebrates, a bit lower down, we can find the
						class of mammals, the class of birds, the class of reptiles, and the class of
						amphibians. We humans are in the family Hominidae (the great apes) and in the order of
						the primates.
					</span>
				</span>
			</span>
			<p class="mb-2 py-2">
				In Taxonomicle, you will be given a random species and you have try to find its place in the
				tree. For this, you progressively descend the tree by choosing between the children of the
				currently selected taxon. This tutorial will guide you through an example of a game using a
				predefined species. The tutorial will give you tips and tricks on how to play the game, as
				taxonomy can be quite confusing at first.
			</p>
			<hr class="h-[1px] rounded bg-neutral" />
			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn-neutral-special btn text-lg">Understood</button>
				</form>
			</div>
		</div>
	</div>
</dialog>
<FixedTaxonPage
	goalTaxonData={data.goalTaxon}
	animaliaTaxon={data.animaliaTaxon}
	isTutorial={true}
/>

<style>
</style>
