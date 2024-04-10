<script lang="ts">
	import FixedTaxonPage from '$lib/components/FixedTaxonPage.svelte';
	import { onMount } from 'svelte';

	export let data;

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
		<p class="py-4 text-justify">
			Taxonomicle is a game where you try to find a species by descending the tree of life.
			<br />
			For this, Taxonomicle uses the field of biology called taxonomy, the scientific study of naming,
			defining and classifying groups of biological organisms based on shared characteristics. These
			groups are called taxa (singular: taxon) and are given a rank to build a hierarchy. For Taxonomicle,
			we start at the kingdom animalia, i.e. the group of all animals. Below there are, amidst others,
			phylum, class, order, family, genus, and species.
			<br />
			For example, Vertebrates are a subphylum (i.e. something smaller than a phylum but bigger than
			a class) that contain, among others, the class of mammals, the class of birds, the class of reptiles,
			and the class of amphibians. We humans are in the family Hominidae (the great apes) and in the
			order of the primates.
			<br />
			In Taxonomicle, you will be given a random species and you have try to find its place in the tree.
			For this, you progressively descend the tree by choosing between the children of the currently
			selected taxon.
			<br />
			In this tutorial, you will be guided through an example of a game using a predefined species. The
			tutorial will give you tips and tricks on how to play the game, as taxonomy can be quite confusing
			at first.
		</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn-neutral-special btn text-lg">Understood</button>
			</form>
		</div>
	</div>
</dialog>
<FixedTaxonPage
	goalTaxonData={data.goalTaxon}
	animaliaTaxon={data.animaliaTaxon}
	isTutorial={true}
/>
