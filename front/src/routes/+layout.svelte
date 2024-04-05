<script lang="ts">
	import '../app.pcss';
	import DecoratedBackground from '$lib/components/decorations/DecoratedBackground.svelte';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

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
	<slot />
	{#if import.meta.env.MODE === 'development'}
		<SvelteQueryDevtools />
	{/if}
</QueryClientProvider>

<style>
</style>
