<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { IconExclamationCircle, IconExternalLink } from '@tabler/icons-svelte';
</script>

<svelte:head>
	<title>Taxonomicle - Error {$page.status}</title>
	<meta
		name="description"
		content="Taxonomicle is game where you have to find a species in the tree of life and learn some taxonomy facts along the way. A new species is available each day but you can also play in endless mode and share the challenge with a friend!"
	/>
</svelte:head>

<main class="fixed top-0 flex min-h-screen w-screen content-center items-center justify-center">
	<div class="hero h-fit w-fit">
		<div class="hero-overlay bg-base-100"></div>
		<div class="hero-content p-10 text-center sm:p-14 lg:p-20">
			<div class="max-w-md">
				<h1 class="title text-5xl font-bold text-error sm:text-6xl lg:text-7xl">
					{$page.status}
				</h1>
				<div class="m-4 text-center">
					<span role="alert" class="alert alert-error">
						<IconExclamationCircle size={30} class="stroke-current" />
						<span>
							{#if $page.status === 404}
								This page doesn't seem to exist.
							{:else if $page.status === 500}
								Something went wrong with Taxonomicle. Please try to reload the page. If the problem
								persists, please make an issue on the
								<a
									href="https://github.com/TheEaterr/taxonomicle"
									target="_blank"
									rel="noopener"
									class="link">site's github<IconExternalLink class="inline" size={15} /></a
								>.
							{:else}
								{$page.error?.message}
							{/if}
						</span>
					</span>
				</div>
				<div>
					{#if $page.status !== 404}
						<button on:click={() => location.reload()} class="btn-neutral-special btn btn-sm"
							>Reload the page</button
						>
					{/if}
					<button on:click={() => goto('/')} class="btn-neutral-special btn btn-sm ml-1"
						>Go back home</button
					>
				</div>
			</div>
		</div>
	</div>
</main>

<style lang="postcss">
	.main-btn {
		@apply text-lg sm:btn-lg;
	}

	.title {
		-webkit-text-stroke: 2px oklch(var(--nc));
	}
</style>
