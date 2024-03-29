<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconHome } from '@tabler/icons-svelte';
</script>

<button
	on:click={() => {
		goto('/');
	}}
>
	<IconHome class="swap-on h-10 w-10" />
</button>
