<script lang="ts">
	import {
		IconAlertTriangle,
		IconExclamationCircle,
		IconExternalLink,
		IconX
	} from '@tabler/icons-svelte';
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
	let selectedTaxon = 'current';
	let description = '';

	const reportMutation = createMutation({
		mutationFn: ({ taxonId, description }: { taxonId: string; description: string }) =>
			createReport(taxonId, description),
		onSuccess: () => {
			// reset form
			description = '';
			selectedTaxon = 'current';
			// close modal
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

<div class="tooltip tooltip-bottom" data-tip="Report a data problem">
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
			<button
				class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
				disabled={$reportMutation.isPending}><IconX /></button
			>
		</form>
		<h3 class="small-title text-3xl font-bold text-error">Report a data problem</h3>
		<div class="m-2 text-sm leading-3 text-absolute">
			If have a technical problem with the website and not a problem with the data, please make an
			issue on the
			<a href="https://github.com/TheEaterr/taxonomicle" target="_blank" rel="noopener" class="link"
				>site's github<IconExternalLink class="inline" size={15} /></a
			>. For more information on how Taxonomicle was made and where its data comes from, please
			visit the
			<a href="/about" class="link">about page</a>.
		</div>
		<hr class="h-[1px] rounded bg-neutral" />
		<div class="text-justify">
			<form
				on:submit={(e) => {
					e.preventDefault();
					$reportMutation.mutate({
						taxonId: selectedTaxon === 'goal' ? goalTaxonId : currentTaxonId,
						description
					});
				}}
			>
				<div class="m-4">
					<fieldset>
						<div
							class="relative mt-4 h-min max-w-full rounded-lg border-2 border-neutral-content p-1 pt-3"
						>
							<div
								class="absolute left-3 right-6 top-[-15px] w-fit rounded-lg bg-neutral-content pl-1 pr-1 text-left font-semibold text-neutral"
							>
								<legend>Relevant taxon</legend>
							</div>
							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text font-semibold">Current taxon</span>
									<input
										type="radio"
										name="radio-taxon"
										class="radio-secondary radio radio-sm"
										value="current"
										disabled={$reportMutation.isPending}
										bind:group={selectedTaxon}
									/>
								</label>
								<label class="label cursor-pointer">
									<span class="label-text font-semibold">Goal taxon</span>
									<input
										type="radio"
										name="radio-taxon"
										class="radio-primary radio radio-sm"
										value="goal"
										disabled={$reportMutation.isPending}
										bind:group={selectedTaxon}
									/>
								</label>
							</div>
						</div>
					</fieldset>
					<textarea
						class="textarea mt-4 w-full border-2 border-neutral text-absolute"
						placeholder="Description of the problem"
						bind:value={description}
						required
						disabled={$reportMutation.isPending}
						on:invalid={(e) => {
							e.currentTarget?.setCustomValidity('Please enter a description.');
						}}
						on:change={(e) => {
							e.currentTarget?.setCustomValidity('');
						}}
					></textarea>
				</div>
				<hr class="h-[1px] rounded bg-neutral" />
				{#if $reportMutation.isError}
					<div class="mt-4 text-center">
						<span role="alert" class="alert alert-error">
							<IconExclamationCircle size={30} class="stroke-current" />
							<span
								>Submitting this report failed, please check your network connection or try again.</span
							>
						</span>
					</div>
				{/if}
				<div class="modal-action mt-4">
					<button class="btn-primary-special btn text-lg">
						{#if $reportMutation.isPending}
							<span class="loading loading-dots loading-lg"></span>
						{:else}
							Submit
						{/if}</button
					>
				</div>
			</form>
		</div>
	</div>
</dialog>

<style lang="postcss">
	.label {
		@apply pt-0;
	}
</style>
