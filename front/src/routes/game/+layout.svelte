<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const currentTaxon = writable<string>('');
	const numberSteps = writable<number>(0);
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
</script>

<div class="flex flex-col content-center items-center">
	<slot />
</div>
