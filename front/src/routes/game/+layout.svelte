<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { getContext, setContext } from 'svelte';
	import { type Snapshot } from '@sveltejs/kit';
	import type { GameContext } from '$lib/gameContext';
	import { writable, type Writable } from 'svelte/store';

	const currentTaxon = writable<string>('');
	const numberSteps = writable<number>(-1);
	const goalTaxon = writable<string>('');
	const gameStarted = writable<boolean>(false);
	const gameWon = getContext<Writable<boolean>>('gameWon');
	setContext('currentTaxon', currentTaxon);
	setContext('numberSteps', numberSteps);
	setContext('goalTaxon', goalTaxon);
	setContext('gameStarted', gameStarted);

	beforeNavigate(() => {
		// since gameWon is set before, we have to take care
		// to leave it in a coherent state
		gameWon.set(false);
	});

	const snapshot: Snapshot<GameContext | undefined> = {
		capture: () => {
			if (!$gameWon) {
				return { currentTaxon: $currentTaxon, steps: $numberSteps, goalTaxon: '' };
			}
		},
		restore: async (value) => {
			if (!value || !value.currentTaxon) {
				value = {
					currentTaxon: 'Q729___________',
					steps: -1,
					goalTaxon: ''
				};
			}
			currentTaxon.set(value.currentTaxon);
			numberSteps.set(value.steps);
		}
	};

	const reset = async () => {
		currentTaxon.set('Q729___________');
		numberSteps.set(-1);
		gameWon.set(false);
	};

	setContext('fixedReset', reset);
	setContext('fixedSnapshot', snapshot);
</script>

<div class="flex flex-col content-center items-center">
	<slot />
</div>
