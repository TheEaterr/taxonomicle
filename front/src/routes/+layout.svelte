<script lang="ts">
	import '../app.pcss';
	import DecoratedBackground from '$lib/components/decorations/DecoratedBackground.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<DecoratedBackground />

<button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">Switch mode</button>

<article class="prose max-w-none text-center">
	<slot />
</article>

<style>
</style>
