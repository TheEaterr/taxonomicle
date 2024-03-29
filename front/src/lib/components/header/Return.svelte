<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte';
</script>

<button
	on:click={() => {
		window.history.back();
	}}
>
	<IconArrowLeft class="swap-on h-10 w-10" />
</button>
