<script lang="ts">
	import Return from '$lib/components/header/Return.svelte';
	import ResetButton from '$lib/components/header/ResetButton.svelte';
	import Home from '$lib/components/header/Home.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { IconSun, IconMoon } from '@tabler/icons-svelte';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	export let reset: (() => void) | undefined;
</script>

<div class="fixed left-0 top-0 z-10 m-2 rounded-xl bg-base-200 bg-opacity-80 p-2">
	<Return />
	<Home />
	{#if reset}
		<ResetButton {reset} />
	{/if}
</div>
<div class="fixed right-0 top-0 z-10 m-2 rounded-xl bg-base-200 bg-opacity-80 p-2">
	<label class="swap swap-rotate">
		<!-- this hidden checkbox controls the state -->
		<input type="checkbox" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" />
		<IconSun class="swap-on h-10 w-10" stroke={2} />
		<IconMoon class="swap-off h-10 w-10" stroke={2} />
	</label>
</div>
<div class="mb-[72px] w-full"></div>
