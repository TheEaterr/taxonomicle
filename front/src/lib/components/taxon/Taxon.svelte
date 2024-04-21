<script lang="ts">
	import type { getGoalTaxon } from '$lib/pocketBase';
	import { onMount } from 'svelte';
	import IUCNSVG from './IUCNSVG.svelte';
	import { IconExternalLink, IconPhotoCancel, IconAlertTriangle } from '@tabler/icons-svelte';

	export let data: Awaited<ReturnType<typeof getGoalTaxon>> | undefined;
	export let isGoal: boolean;

	let imageLoaded = false;
	let img: HTMLImageElement;
	let imageContainer: HTMLDivElement;

	const getImageLink = (imageLink: string): string => {
		return `https://www.mediawiki.org/w/index.php?title=Special:Redirect/file/${imageLink}&width=983&height=384`;
	};

	onMount(() => {
		img = new Image();
		img.onload = () => {
			imageLoaded = true;
		};
		img.classList.add('max-h-96', 'w-auto');
	});

	// Here we are doing a bit of wizardy so the window doesn't scroll back up
	// while all the data is loaded but the image.
	$: {
		if (img) {
			// data being undefined means
			// query is in loading state
			if (!data) {
				img.src = '';
				img.alt = '';
				imageLoaded = false;
			}
		}
	}

	$: {
		if (img) {
			if (data?.image_link) {
				img.src = getImageLink(data?.image_link);
				img.alt = data?.scientific;
			}
		}
		// we have to readd the image since after passing throuh a loading
		// state the container was removed from the DOM
		if (imageContainer) {
			// removing all children shouldn't be necessary
			// but just in case
			imageContainer.innerHTML = '';
			imageContainer.appendChild(img);
		}
	}
</script>

<div class="m-[5vw] min-[400px]:m-5">
	<div
		class="card !ml-auto !mr-auto min-w-[90vw] bg-base-200 shadow-md min-[550px]:min-w-[500px] lg:max-w-[983px]"
	>
		{#if data && imageLoaded && data.image_link}
			<figure class="m-0 max-h-96" style="background-image: url('{getImageLink(data.image_link)}')">
				<div class="glass flex w-full flex-col items-center" bind:this={imageContainer}></div>
			</figure>
		{:else if data && !data.image_link}
			<div
				class="skeleton flex h-96 w-full flex-col items-center justify-center gap-5 rounded-b-none"
			>
				<IconPhotoCancel size={96} color={'oklch(var(--n))'} class="mt-16" />
				<span role="alert" class="alert m-2">
					<IconAlertTriangle size={30} color="oklch(var(--wa))" />
					<span> No image available for this taxon </span>
				</span>
			</div>
		{:else}
			<div class="skeleton h-96 w-full rounded-b-none"></div>
		{/if}
		<div class="card-body flex-row">
			<!-- Allows for the description text to limit itself to the wdith of the image. -->
			<div class="w-0 grow text-left">
				<div>
					{#if data}
						<h2 class="card-title">
							<div class="badge badge-primary badge-lg font-bold">Scientific</div>
							<div class="mb-1 italic">
								{data.scientific}
							</div>
						</h2>
						{#if data.vernacular}
							<div class="badge badge-secondary font-bold">Vernacular</div>
							<span class="font-semibold">
								{data.vernacular}
							</span>
						{/if}
						{#if !isGoal}
							<div class="font-accent-content badge badge-accent font-bold">Rank</div>
							<span class="font-semibold">
								{data.expand?.rank.name}
							</span>
						{/if}
						{#if data.iucn && data.iucn !== 'DD'}
							<div class="flex items-center">
								<div>
									<div class="font-neutral-content badge badge-neutral mt-5 font-bold">IUCN</div>
									<div class="text-sm">
										<a class="link" href="https://www.iucn.org"
											>Learn more <IconExternalLink size={15} class="mb-1 inline" /></a
										>
									</div>
								</div>
								<IUCNSVG iucn={data.iucn} />
							</div>
						{/if}

						<div class="text-justify">
							{data.description}
						</div>
					{:else}
						<div class="skeleton mb-4 h-6 w-60"></div>
						<div class="skeleton mb-4 h-6 w-60"></div>
						{#each Array(16) as _}
							<div class="skeleton mb-3 h-4 w-full"></div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
