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
			Press ESC key or click the button below to close Press ESC key or click the button below to
			closeb Press ESC key or click the button below to closeb Press ESC key or click the button
			below to closeb Press ESC key or click the button below to closeb Press ESC key or click the
			button below to closeb Press ESC key or click the button below to closeb Press ESC key or
			click the button below to closeb Press ESC key or click the button below to closeb Press ESC
			key or click the button below to closeb Press ESC key or click the button below to closeb
			Press ESC key or click the button below to closeb Press ESC key or click the button below to
			closeb Press ESC key or click the button below to closeb Press ESC key or click the button
			below to closeb Press ESC key or click the button below to closeb Press ESC key or click the
			button below to closeb Press ESC key or click the button below to closeb
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
