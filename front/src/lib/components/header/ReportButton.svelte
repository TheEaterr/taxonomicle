<script lang="ts">
	import { IconAlertTriangle, IconExternalLink, IconX } from '@tabler/icons-svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { createReport } from '$lib/pocketBase';

	let button: HTMLButtonElement;
	const animate = () => {
		button.animate(
			[
				{ transform: 'translate(0px)' },
				{ transform: 'translate(0px, -5px)' },
				{ transform: 'translate(0px)' }
			],
			{
				duration: 500,
				iterations: 1,
				easing: 'ease-in-out'
			}
		);
	};

	export let currentTaxonId: string;
	export let goalTaxonId: string;
	let useGoalTaxon = false;
	let description = '';

	const reportMutation = createMutation({
		mutationFn: ({ taxonId, description }: { taxonId: string; description: string }) =>
			createReport(taxonId, description),
		onSuccess: () => {
			const reportModal: HTMLDialogElement | null = document.getElementById(
				'report-modal'
			) as HTMLDialogElement | null;
			if (reportModal) reportModal.close();
		}
	});

	const showModal = () => {
		const reportModal: HTMLDialogElement | null = document.getElementById(
			'report-modal'
		) as HTMLDialogElement | null;
		if (reportModal) reportModal.showModal();
	};
</script>

<div class="tooltip tooltip-bottom" data-tip="Report an issue with this taxon">
	<button
		bind:this={button}
		on:click={() => {
			animate();
			showModal();
		}}
	>
		<IconAlertTriangle class="swap-on h-10 w-10" />
	</button>
</div>

<dialog id="report-modal" class="modal">
	<div class="modal-box w-11/12 max-w-5xl bg-base-200">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"><IconX /></button>
		</form>
		<h3 class="small-title text-3xl font-bold text-error">Report a data problem</h3>
		<div class="text-sm text-gray-700">
			If have a technical problem with the website and not a problem with the data, please make an
			issue on the
			<a href="https://github.com/TheEaterr/taxonomicle" target="_blank" rel="noopener" class="link"
				>site's github<IconExternalLink class="mb-2 inline" size={15} /></a
			>. For more information on how Taxonomicle was made and where its data comes from, please
			visit the
			<a href="/about" class="link">about page</a>.
		</div>
		<hr class="h-[1px] rounded bg-neutral" />
		<div class="text-justify">
			<p class="mt-2 py-2">
				Taxonomicle is a game where you try to find a species by descending the tree of life.
			</p>
			<hr class="h-[1px] rounded bg-neutral" />
			<form
				on:submit={(e) => {
					e.preventDefault();
					$reportMutation.mutate({
						taxonId: useGoalTaxon ? goalTaxonId : currentTaxonId,
						description
					});
				}}
			>
				<input type="checkbox" class="toggle" bind:checked={useGoalTaxon} />
				<textarea
					class="textarea required:border-red-500"
					placeholder="Description"
					bind:value={description}
					required
				></textarea>
			</form>
			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn-primary-special btn text-lg">Submit</button>
				</form>
			</div>
		</div>
	</div>
</dialog>
