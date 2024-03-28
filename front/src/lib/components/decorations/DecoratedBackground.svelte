<script lang="ts">
	import DecorationIcon from '$lib/components/decorations/DecorationIcon.svelte';
	import {
		DecorationPossibilities,
		getRandomDecoration
	} from '$lib/components/decorations/decorationPossibilities';

	let decorations: ({ x: number; y: number; icon: DecorationPossibilities } | undefined)[][] = [];

	const wrapValue = (value: number) => {
		const initialValue = value % 5000;
		return (initialValue * (5000 - initialValue)) / 1250 - 2500;
	};

	let w: number;
	let h: number;
	$: {
		const pxPerCell = 170;
		const numberColumns = Math.floor(w / pxPerCell);
		const numberRows = Math.floor(h / pxPerCell);
		for (let i = decorations.length; i < numberColumns; i++) {
			decorations.push([]);
		}
		for (let i = 0; i < numberColumns; i++) {
			for (let j = decorations[i].length; j < numberRows; j++) {
				if (Math.random() < 0.4) {
					decorations[i].push(undefined);
					continue;
				}
				// we add an offset for 10 to place the center of the decoration
				const centerOffset = 10;
				decorations[i].push({
					x: ((i + 0.25 + 0.5 * Math.random()) / numberColumns) * w - centerOffset,
					y: ((j + 0.25 + 0.5 * Math.random()) / numberRows) * h - centerOffset,
					icon: getRandomDecoration()
				});
			}
			decorations[i] = decorations[i].slice(0, numberRows);
		}
		decorations = decorations.slice(0, numberColumns);
	}
</script>

<div bind:clientWidth={w} bind:clientHeight={h} class="fixed -z-10 h-screen w-screen">
	{#each decorations as row}
		{#each row as cell}
			{#if cell}
				<div
					class="absolute size-[20px] animate-pulse bg-cover"
					style="left: {cell.x}px; top: {cell.y}px; animation-delay: {wrapValue(
						cell.x * cell.y
					)}ms; animation-duration: 5s;"
				>
					<DecorationIcon decoration={cell.icon} />
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style>
</style>
