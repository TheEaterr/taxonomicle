<script lang="ts">
	import { IconQuestionMark } from '@tabler/icons-svelte';

	export let scientific: string;
	export let vernacular: string | undefined;
	export let rank: string;
	export let id: string;
	export let update: (newId: string) => Promise<void>;
	export let description: { short: string; long: string } | undefined;

	const toggleTooltip = (value: boolean) => {
		const tooltip = document.getElementById('description-tooltip-' + id);
		if (!tooltip) return;
		if (value) {
			tooltip.classList.add('tooltip-open');
		} else {
			tooltip.classList.remove('tooltip-open');
		}
	};
</script>

<div class="join">
	<button
		on:click={() => update(id)}
		class="group join-item bg-{rank} border-{rank}-content btn hover:bg-{rank}-content hover:border-{rank} relative h-fit text-lg text-absolute hover:text-absolute-content"
	>
		<div class="z-10 mb-3 leading-5">
			<span class="italic">{scientific}</span>
			{#if vernacular}
				<span class="mb-1 text-base opacity-80">({vernacular})</span>
			{/if}
		</div>
		<div
			class="absolute bottom-[-3px] right-2 z-0 text-sm text-{rank}-content group-hover:text-{rank} group-hover:bg-{rank}-content bg-{rank} rounded"
		>
			{rank}
		</div>
	</button>
	<div
		class="tooltip tooltip-top before:z-20 before:max-w-52 before:translate-x-[-80%] before:text-absolute-content"
		data-tip={description ? description.short : 'No description available.'}
		id="description-tooltip-{id}"
	>
		<button
			class="btn-neutral-special btn btn-circle join-item relative right-[-1px] rounded-full !border-l-0"
			on:mouseover={() => toggleTooltip(true)}
			on:focus={() => toggleTooltip(true)}
			on:focusout={() => toggleTooltip(false)}
			on:mouseleave={() => toggleTooltip(false)}
		>
			<IconQuestionMark stroke={3} size={30} />
		</button>
	</div>
</div>

<style>
</style>
