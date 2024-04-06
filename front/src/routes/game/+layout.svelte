<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const currentTaxon = writable<string>('');
	const numberSteps = writable<number>(0);
	const goalTaxon = writable<string>('');
	const gameStarted = writable<boolean>(false);
	const gameWon = writable<boolean>(false);
	setContext('currentTaxon', currentTaxon);
	setContext('numberSteps', numberSteps);
	setContext('goalTaxon', goalTaxon);
	setContext('gameStarted', gameStarted);
	setContext('gameWon', gameWon);
</script>

<div class="flex flex-col content-center items-center">
	<slot />
</div>
