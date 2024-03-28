<script lang="ts">
	import '../app.pcss';
	import DecoratedBackground from '$lib/components/decorations/DecoratedBackground.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { IconSun, IconMoon } from '@tabler/icons-svelte';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<DecoratedBackground />

<label class="swap swap-rotate fixed right-5 top-5">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" />
	<IconSun class="swap-on h-10 w-10" stroke={2} />
	<IconMoon class="swap-off h-10 w-10" stroke={2} />
</label>

<slot />

<style>
</style>
