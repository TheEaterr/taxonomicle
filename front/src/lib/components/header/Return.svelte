<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconArrowLeft } from '@tabler/icons-svelte';
</script>

<button
	on:click={() => {
		goto('/');
	}}
>
	<!-- this hidden checkbox controls the state -->
	<IconArrowLeft class="swap-on h-10 w-10" stroke={2} />
</button>
