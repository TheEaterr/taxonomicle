<script lang="ts">
	import '../app.pcss';
	import DecoratedBackground from '$lib/components/decorations/DecoratedBackground.svelte';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { navigating } from '$app/stores';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<DecoratedBackground />

<QueryClientProvider client={queryClient}>
	{#if $navigating}
		<!-- TODO: make pretty loading icon after making branding items -->
		<div class="flex h-screen w-screen items-center justify-center">
			<span class="animate-suspense loading loading-spinner w-20 text-neutral opacity-0"></span>
		</div>
	{:else}
		<slot />
	{/if}
	{#if import.meta.env.MODE === 'development'}
		<SvelteQueryDevtools />
	{/if}
</QueryClientProvider>

<style lang="postcss">
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes suspense {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}

	.animate-suspense {
		animation: suspense 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		animation-delay: 300ms;
	}
</style>
