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
</script>

{#if decoration === DecorationPossibilities.BUTTERFLY}
	<IconButterfly />
{:else if decoration === DecorationPossibilities.CAT}
	<IconCat />
{:else if decoration === DecorationPossibilities.FISH}
	<IconFish />
{:else if decoration === DecorationPossibilities.FEATHER}
	<IconFeather />
{:else if decoration === DecorationPossibilities.SPIDER}
	<IconSpider />
{:else if decoration === DecorationPossibilities.DOG}
	<IconDog />
{:else if decoration === DecorationPossibilities.BAT}
	<IconBat />
{:else if decoration === DecorationPossibilities.BUG}
	<IconBug />
{:else}
	<p>Unknown decoration</p>
{/if}

<style lang="postcss">
</style>
