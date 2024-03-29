<script lang="ts">
	import Return from '$lib/components/header/Return.svelte';
	import ResetButton from '$lib/components/header/ResetButton.svelte';

	export let reset: (() => void) | undefined;
</script>

<div class="fixed left-5 top-5">
	<Return />
	{#if reset}
		<ResetButton {reset} />
	{/if}
</div>
