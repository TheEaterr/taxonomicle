<script lang="ts">
	import TaxonButton from '$lib/components/taxon/TaxonButton.svelte';
	import TutorialAlerts from '$lib/components/tutorial/TutorialAlerts.svelte';
	import BeforeGameAlert from '$lib/components/tutorial/BeforeGameAlert.svelte';
	import { getGoalTaxon, getTaxonData, reduceDescription } from '$lib/pocketBase';
	import { getContext } from 'svelte';
	import { derived, type Readable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import Taxon from './taxon/Taxon.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		IconTrophy,
		IconAlertTriangle,
		IconExclamationCircle,
		IconInfoCircle,
		IconShare,
		IconBrandWikipedia,
		IconExternalLink
	} from '@tabler/icons-svelte';

	export let goalTaxonData: Awaited<ReturnType<typeof getGoalTaxon>> | undefined;
	export let animaliaTaxon: Awaited<ReturnType<typeof getTaxonData>>;
	export let isDaily: boolean;
	export let isTutorial: boolean = false;

	const numberSteps = getContext<Writable<number>>('numberSteps');
	const currentTaxon = getContext<Writable<string>>('currentTaxon');
	const gameWon = getContext<Writable<boolean>>('gameWon');
	gameWon.set(false);

	let gameStarted = $numberSteps >= 0;
	$: gameStarted = $numberSteps >= 0;

	// we use tanstack queries to allow caching of the result
	const currentTaxonQuery = createQuery(
		// This typecast is a bit of a hack because having variable initialData
		// make typescript unable to infer the type of the derived function call
		// and thus enable to chose the correct overload. We can simply use the
		// typecast to force the correct overload (for undefined initial data).
		derived(currentTaxon, ($currentTaxon) => ({
			// the case where goalTaxonData should hopefully never happen
			// but it shouldn't cause any problem if it does.
			queryKey: ['taxonData', $currentTaxon, goalTaxonData?.path || ''],
			queryFn: () => getTaxonData($currentTaxon, goalTaxonData?.path || []),
			initialData: $currentTaxon == animaliaTaxon.id ? animaliaTaxon : undefined,
			staleTime: Infinity
		})) as Readable<{
			queryKey: (string | string[])[];
			queryFn: () => ReturnType<typeof getTaxonData>;
			staleTime: number;
		}>
	);

	const updateCurrentTaxon = async (newId: string) => {
		currentTaxon.set(newId);
		numberSteps.update((n) => n + 1);
	};

	const shareToClipboard = async () => {
		if (goalTaxonData === undefined) return;
		if (isDaily) {
			await navigator.clipboard.writeText(
				`I was able to reach the daily taxon ${goalTaxonData.scientific} in ${$numberSteps} steps 🏆 on Taxonomicle 🐻!\nTry it yourself at https://taxonomicle.com/game/daily 🎯 before it expires ⏰!`
			);
		} else {
			await navigator.clipboard.writeText(
				`I was able to reach the taxon ${goalTaxonData.scientific} in ${$numberSteps} steps 🏆 on Taxonomicle 🐻!\nTry it yourself at https://taxonomicle.com/game/custom/${goalTaxonData.id} 🎯!`
			);
		}
		toggleTooltip(true);
	};

	const toggleTooltip = (value: boolean) => {
		const tooltip = document.getElementById('description-tooltip-share');
		if (!tooltip) return;
		// add important modifier so it isn't overriden by the removal of the
		// hover
		if (value) {
			tooltip.classList.add('!tooltip-open');
		} else {
			tooltip.classList.remove('!tooltip-open');
		}
	};

	let isGoalReached = false;
	$: isGoalReached =
		$currentTaxonQuery.data !== undefined &&
		goalTaxonData !== undefined &&
		$currentTaxonQuery.data.id === goalTaxonData.path[goalTaxonData.path.length - 1];
	$: if (isGoalReached) gameWon.set(true);
</script>

<div class="flex flex-wrap justify-center gap-5 text-center">
	<div>
		<h2 class="small-title mb-3 text-3xl font-bold text-primary">Goal Taxon</h2>
		<Taxon data={goalTaxonData} isGoal={true} />
		{#if !gameStarted}
			{#if isTutorial}
				<BeforeGameAlert />
			{/if}
			<div class="m-3">
				{#if !isTutorial}
					<button
						on:click={() => goto('/game/tutorial')}
						class="btn-neutral-special btn btn-sm mr-5">How to play</button
					>
				{/if}
				<button
					on:click={() => numberSteps.update((n) => n + 1)}
					class="btn-primary-special btn text-lg">Start</button
				>
			</div>
			<div class="m-4 text-center">
				<span role="alert" class="alert max-w-screen-lg">
					<IconInfoCircle size={30} color="oklch(var(--in))" />
					<span>
						<h3 class="text-lg font-bold">Disclaimer</h3>
						<span class="inline-block text-justify">
							All the data shown here comes from the Wikimedia Foundation. In particular, we give <span
								class="font-bold">no scientific guarantee</span
							>
							of its accuracy. It was heavily processed to give an enjoyable gaming experience and only
							a partial view is shown. For more details about how Taxonomicle was made, please visit
							the <a href="/about" class="link">about page</a>.
						</span>
					</span>
				</span>
			</div>
		{/if}
	</div>

	{#if gameStarted && !isGoalReached}
		<div>
			<h2 class="small-title mb-3 text-3xl font-bold text-secondary">Current Taxon</h2>
			<Taxon data={$currentTaxonQuery.data?.taxon} isGoal={false} />
		</div>
	{/if}
</div>
{#if gameStarted}
	<div class="flex flex-col justify-center gap-5">
		<div class="m-2 flex flex-wrap items-center justify-center gap-5">
			<div class="stats stats-vertical bg-base-200 shadow lg:stats-horizontal">
				<div class="stat">
					<div class="stat-figure text-primary">
						<IconTrophy size={30} />
					</div>
					<div class="stat-title font-semibold text-absolute">Steps taken</div>
					<div class="small-title stat-value text-primary">{$numberSteps}</div>
				</div>
				{#if isGoalReached}
					<div class="stat">
						<div></div>
						<div
							class="tooltip tooltip-bottom before:z-20"
							data-tip={'Copied to clipboard!'}
							id="description-tooltip-share"
						>
							<div class="stat-value">
								<button
									on:click={shareToClipboard}
									on:focusout={() => toggleTooltip(false)}
									class="btn-secondary-special btn h-fit text-lg"
									><IconShare />Share your score</button
								>
							</div>
						</div>
						<div class="goal-stat-desc stat-desc">Invite your friends to try the same taxon!</div>
					</div>
					{#if goalTaxonData}
						<div class="stat">
							<div class="stat-figure text-neutral">
								<IconBrandWikipedia size={30} />
							</div>
							<div class="stat-title font-semibold text-absolute">Wikipedia</div>
							<div class="stat-value text-2xl font-bold text-neutral">
								<a
									href={`https://en.wikipedia.org/wiki/${goalTaxonData.site_link}`}
									target="_blank"
									rel="noopener"
									class="link">Learn more<IconExternalLink class="mb-2 inline" /></a
								>
							</div>
							<div class="goal-stat-desc stat-desc">
								Visit this taxon's wikipedia page to learn more!
							</div>
						</div>
					{/if}
				{/if}
			</div>
			{#if $currentTaxonQuery.isSuccess && $currentTaxonQuery.data.taxon.expand?.parent !== undefined}
				<div
					class="relative inline-block h-fit rounded-lg border-2 border-neutral-content p-1 pt-3"
				>
					<div
						class="absolute left-3 right-6 top-[-15px] w-fit rounded-lg bg-neutral-content pl-1 pr-1 text-left font-semibold text-neutral"
					>
						Parent
					</div>
					<TaxonButton
						scientific={$currentTaxonQuery.data.taxon.expand.parent.scientific}
						vernacular={$currentTaxonQuery.data.taxon.expand.parent.vernacular}
						rank={$currentTaxonQuery.data.taxon.expand.parent.expand?.rank.name ?? ''}
						id={$currentTaxonQuery.data.taxon.parent}
						update={updateCurrentTaxon}
					/>
				</div>
			{/if}
		</div>
		{#if isTutorial && $currentTaxonQuery.isSuccess && goalTaxonData !== undefined}
			<TutorialAlerts currentTaxonId={$currentTaxonQuery.data.id} path={goalTaxonData?.path} />
		{/if}
		{#if !isGoalReached}
			{#if $currentTaxonQuery.isSuccess && $currentTaxonQuery.data.overflown}
				<div class="ml-4 mr-4 text-center">
					<span role="alert" class="alert">
						<IconAlertTriangle size={30} color="oklch(var(--wa))" />
						<span
							>To make the game playable, only a partial view of this taxon's children is shown
							here.
							<br />
							Don't worry we didn't forget to put the correct one !</span
						>
					</span>
				</div>
			{/if}
			{#if !$currentTaxonQuery.isError && (!$currentTaxonQuery.isSuccess || $currentTaxonQuery.data.children.items.length > 0)}
				<div
					class="relative m-2 ml-3 mr-3 flex h-min max-w-full flex-wrap justify-center gap-5 rounded-lg border-2 border-neutral-content p-1 pt-3"
				>
					<div
						class="absolute left-3 right-6 top-[-15px] w-fit rounded-lg bg-neutral-content pl-1 pr-1 text-left font-semibold text-neutral"
					>
						Choose a child
					</div>
					{#if $currentTaxonQuery.isSuccess}
						{#each $currentTaxonQuery.data.children.items as child}
							<TaxonButton
								scientific={child.scientific}
								vernacular={child.vernacular}
								rank={child.expand?.rank.name ?? ''}
								id={child.id}
								update={updateCurrentTaxon}
								description={reduceDescription(child.description)}
							/>
						{/each}
					{:else}
						<span class="loading loading-dots loading-lg text-neutral-content"></span>
					{/if}
				</div>
			{:else if $currentTaxonQuery.isSuccess && $currentTaxonQuery.data.children.items.length == 0}
				<h2 class="small-title mb-3 text-center text-3xl font-bold text-error">Wrong species!</h2>
			{:else}
				<div class="mb-5 text-center">
					<span role="alert" class="alert alert-error">
						<IconExclamationCircle size={30} class="stroke-current" />
						<span
							>Something went wrong while fetching this taxon's data. Please check your network
							connection or try to refresh the page (you will not lose your progress). <br /> If this
							problem persists, please report the issue using the button at the top left of your window.</span
						>
					</span>
				</div>
			{/if}
		{:else}
			<h2 class="small-title text-center text-3xl font-bold text-primary">Goal reached!</h2>
			{#if isTutorial}
				<button
					on:click={() => goto('/game/daily')}
					class="btn-primary-special btn m-auto mb-3 w-fit text-lg">Play the Daily</button
				>
			{:else}
				<button
					on:click={() => goto('/game/endless')}
					class="btn-primary-special btn m-auto mb-3 w-fit text-lg">Play again</button
				>
			{/if}
		{/if}
	</div>
{/if}

<style lang="postcss">
	.goal-stat-desc {
		@apply mt-1 w-fit text-wrap;
	}

	/* deactivating the tooltip on hover */
	.tooltip:hover:before {
		opacity: 0;
	}

	.tooltip:hover:after {
		opacity: 0;
	}
</style>
