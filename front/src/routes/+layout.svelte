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
		Loading...
	{:else}
		<slot />
	{/if}
	{#if import.meta.env.MODE === 'development'}
		<SvelteQueryDevtools />
	{/if}
</QueryClientProvider>

<style>
</style>
