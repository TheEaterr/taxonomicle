<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const currentTaxon = writable<string>('');
	const numberSteps = writable<number>(0);
	const goalTaxon = writable<string>('');
	setContext('currentTaxon', currentTaxon);
	setContext('numberSteps', numberSteps);
	setContext('goalTaxon', goalTaxon);
</script>

<a href="/" class="link">Go back home</a>

<article class="prose max-w-none text-center">
	<slot />
</article>
