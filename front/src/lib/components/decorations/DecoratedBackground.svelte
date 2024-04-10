<script lang="ts">
	import DecorationIcon from '$lib/components/decorations/DecorationIcon.svelte';
	import {
		DecorationPossibilities,
		getRandomDecoration
	} from '$lib/components/decorations/decorationPossibilities';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let decorations: ({ x: number; y: number; icon: DecorationPossibilities }[] | undefined)[][] = [];

	const wrapValue = (value: number) => {
		const animationDuration = 5000;
		const initialValue = ((value % 10) / 10) * animationDuration;
		return (
			(initialValue * (animationDuration - initialValue)) / (animationDuration / 4) -
			animationDuration / 2
		);
	};

	const gameWon = getContext<Writable<boolean>>('gameWon');

	let w: number;
	let h: number;
	$: {
		const pxPerCell = 150;
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
				const xOffset = Math.random() * 0.5;
				const yOffset = Math.random() * 0.5;
				const decorationsInCell = [
					{
						x: ((i + 0.25 + xOffset) / numberColumns) * w - centerOffset,
						y: ((j + 0.25 + yOffset) / numberRows) * h - centerOffset,
						icon: getRandomDecoration()
					},
					{
						x: ((i + 0.75 - xOffset) / numberColumns) * w - centerOffset,
						y: ((j + 0.75 - yOffset) / numberRows) * h - centerOffset,
						icon: getRandomDecoration()
					}
				];
				decorations[i].push(decorationsInCell);
			}
			decorations[i] = decorations[i].slice(0, 2 * numberRows);
		}
		decorations = decorations.slice(0, 2 * numberColumns);
	}
</script>

<div bind:clientWidth={w} bind:clientHeight={h} class="fixed top-0 -z-10 h-screen w-screen">
	<div class="cross-background h-screen w-screen"></div>
	{#each decorations as row}
		{#each row as cell}
			{#if cell}
				<div
					class="{$gameWon
						? 'animate-appear-rgb'
						: 'animate-appear'} absolute size-[20px] bg-cover text-neutral-content"
					style="left: {cell[0].x}px; top: {cell[0].y}px; animation-delay: {wrapValue(
						cell[0].x + cell[0].y
					)}ms; animation-duration: {$gameWon ? 2 : 5}s;"
				>
					<DecorationIcon decoration={cell[0].icon} />
				</div>
				<div
					class="{$gameWon
						? 'animate-appear-reverse-rgb'
						: 'animate-appear-reverse'} absolute size-[20px] bg-cover text-neutral-content opacity-0"
					style="left: {cell[1].x}px; top: {cell[1].y}px; animation-delay: {wrapValue(
						cell[0].x + cell[0].y
					)}ms; animation-duration: {$gameWon ? 2 : 5}s;"
				>
					<DecorationIcon decoration={cell[1].icon} />
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style lang="postcss">
	.cross-background {
		background-color: oklch(var(--nc));
		-webkit-mask-image: url('/src/lib/assets/background.svg');
		mask-image: url('/src/lib/assets/background.svg');
		mask-repeat: space;
	}

	@keyframes appear {
		25% {
			opacity: 0;
		}
		75% {
			opacity: 0;
		}
	}

	@keyframes appear-reverse {
		0% {
			opacity: 0;
		}
		25% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		75% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes rgb {
		0% {
			color: red;
		}
		25% {
			color: yellow;
		}
		50% {
			color: blue;
		}
		75% {
			color: green;
		}
		100% {
			color: red;
		}
	}

	.animate-appear {
		animation: appear 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.animate-appear-rgb {
		animation:
			appear 2s cubic-bezier(0.4, 0, 0.6, 1) infinite,
			rgb 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.animate-appear-reverse {
		animation: appear-reverse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.animate-appear-reverse-rgb {
		animation:
			appear-reverse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite,
			rgb 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
