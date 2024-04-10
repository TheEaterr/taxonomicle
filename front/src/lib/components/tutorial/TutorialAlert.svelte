<script lang="ts">
	import { IconHelp, IconAlertTriangle } from '@tabler/icons-svelte';

	export let isWarning: boolean = false;
</script>

<div class="text-center">
	<span role="alert" class="alert {isWarning ? 'alert-warning' : 'alert-info'} max-w-screen-lg">
		{#if isWarning}
			<IconAlertTriangle size={30} color="oklch(var(--wac))" />
		{:else}
			<IconHelp size={30} color="oklch(var(--inc))" />
		{/if}
		<span>
			<h3 class="text-lg font-bold">Tutorial</h3>
			<span class="inline-block text-justify">
				<slot />
			</span>
		</span>
	</span>
</div>
