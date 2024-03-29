<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte';

	let button: HTMLButtonElement;
	const animate = () => {
		button.animate(
			[
				{ transform: 'translate(0px)' },
				{ transform: 'translate(-5px)' },
				{ transform: 'translate(0px)' }
			],
			{
				duration: 500,
				iterations: Infinity,
				easing: 'ease-in-out'
			}
		);
	};
</script>

<button
	bind:this={button}
	on:click={() => {
		animate();
		window.history.back();
	}}
>
	<IconArrowLeft class="swap-on h-10 w-10" />
</button>
