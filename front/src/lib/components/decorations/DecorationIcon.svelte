<script lang="ts">
	import { IconDna, IconDna2, IconCell, IconFlask } from '@tabler/icons-svelte';
	import { DecorationPossibilities } from '$lib/components/decorations/decorationPossibilities';

	export let decoration: DecorationPossibilities;

	const color = 'oklch(var(--nc))';
</script>

{#if decoration === DecorationPossibilities.DNA}
	<IconDna {color} />
{:else if decoration === DecorationPossibilities.DNA2}
	<IconDna2 {color} />
{:else if decoration === DecorationPossibilities.CELL}
	<IconCell {color} />
{:else if decoration === DecorationPossibilities.FLASK}
	<IconFlask {color} />
{:else}
	<p>Unknown decoration</p>
{/if}

<style>
</style>
