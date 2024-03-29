<script lang="ts">
	import { IconRotate } from '@tabler/icons-svelte';

	export let reset: () => void;

	// TODO : use a proper animation and not just hacking a swap
</script>

<label class="swap swap-rotate fixed left-5 top-5">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" on:click={reset} />
	<IconRotate class="swap-on h-10 w-10" stroke={2} />
	<IconRotate class="swap-off h-10 w-10" stroke={2} />
</label>
