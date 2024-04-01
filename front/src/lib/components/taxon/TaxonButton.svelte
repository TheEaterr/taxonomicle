<script lang="ts">
	import { IconQuestionMark } from '@tabler/icons-svelte';

	export let scientific: string;
	export let vernacular: string | undefined;
	export let rank: string;
	export let id: string;
	export let update: (newId: string) => Promise<void>;
</script>

<div class="join">
	<button
		on:click={() => update(id)}
		class="group join-item bg-{rank} border-{rank}-content btn hover:bg-{rank}-content hover:border-{rank} relative text-lg text-absolute hover:text-absolute-content"
	>
		<div class="z-10">
			<span class="italic">{scientific}</span>
			{#if vernacular}
				<span class="text-base opacity-80">({vernacular})</span>
			{/if}
		</div>
		<div
			class="absolute bottom-[-3px] right-2 z-0 text-sm text-{rank}-content group-hover:text-{rank} group-hover:bg-{rank}-content bg-{rank} rounded"
		>
			{rank}
		</div>
	</button>
	<button class="btn-neutral-special btn btn-circle join-item rounded-full !border-l-0">
		<IconQuestionMark size={24} />
	</button>
</div>

<style>
</style>
