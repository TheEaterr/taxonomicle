<script lang="ts">
	import { IconQuestionMark, IconEye } from '@tabler/icons-svelte';

	export let scientific: string;
	export let vernacular: string | undefined;
	export let rank: string;
	export let id: string;
	export let update: (newId: string) => Promise<void>;
	export let description: string | undefined = undefined;
	export let visited: boolean = false;

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
		type="button"
		class="{visited
			? 'grayscale-[75%]'
			: ''} group join-item bg-{rank} min-w-40 border-{rank}-content btn hover:bg-{rank}-content hover:border-{rank} relative h-fit flex-shrink text-wrap text-lg text-absolute hover:text-absolute-content"
	>
		<div class="mb-3 leading-5">
			<span class="italic">{scientific}</span>
			{#if vernacular}
				<span class="mb-1 text-base opacity-80">({vernacular})</span>
			{/if}
		</div>
		<div
			class="absolute bottom-[-3px] right-2 text-sm text-{rank}-content group-hover:text-{rank} group-hover:bg-{rank}-content bg-{rank} rounded"
		>
			{rank}
		</div>
		{#if visited}
			<div class="absolute right-[2px] top-[-11px] rounded-lg bg-neutral-content text-neutral">
				<IconEye size={20} />
			</div>
		{/if}
	</button>
	{#if description}
		<div
			class="tooltip tooltip-top before:z-20 before:max-w-52 before:translate-x-[-80%] before:text-justify before:text-absolute-content"
			data-tip={description}
			id="description-tooltip-{id}"
		>
			<button
				type="button"
				class="btn-neutral-special btn btn-circle join-item relative right-[-1px] h-full rounded-full !border-l-0"
				on:mouseover={() => toggleTooltip(true)}
				on:focus={() => toggleTooltip(true)}
				on:focusout={() => toggleTooltip(false)}
				on:mouseleave={() => toggleTooltip(false)}
			>
				<IconQuestionMark stroke={3} size={30} />
			</button>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
