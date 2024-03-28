<script lang="ts">
	import {
		IconButterfly,
		IconCat,
		IconFeather,
		IconFish,
		IconSpider,
		IconDog,
		IconBat,
		IconBug
	} from '@tabler/icons-svelte';
	import { DecorationPossibilities } from '$lib/components/decorations/decorationPossibilities';

	export let decoration: DecorationPossibilities;

	const color = 'oklch(var(--nc))';
</script>

{#if decoration === DecorationPossibilities.BUTTERFLY}
	<IconButterfly {color} />
{:else if decoration === DecorationPossibilities.CAT}
	<IconCat {color} />
{:else if decoration === DecorationPossibilities.FISH}
	<IconFish {color} />
{:else if decoration === DecorationPossibilities.FEATHER}
	<IconFeather {color} />
{:else if decoration === DecorationPossibilities.SPIDER}
	<IconSpider {color} />
{:else if decoration === DecorationPossibilities.DOG}
	<IconDog {color} />
{:else if decoration === DecorationPossibilities.BAT}
	<IconBat {color} />
{:else if decoration === DecorationPossibilities.BUG}
	<IconBug {color} />
{:else}
	<p>Unknown decoration</p>
{/if}

<style>
</style>
