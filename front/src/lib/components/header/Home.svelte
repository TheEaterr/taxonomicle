<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconHome } from '@tabler/icons-svelte';

	let button: HTMLButtonElement;
	const animate = () => {
		button.animate(
			[{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
			{
				duration: 500,
				iterations: Infinity,
				easing: 'ease-in-out'
			}
		);
	};
</script>

<div class="tooltip tooltip-bottom" data-tip="Go to Home">
	<button
		bind:this={button}
		on:click={() => {
			animate();
			goto('/');
		}}
	>
		<IconHome class="swap-on h-10 w-10" />
	</button>
</div>
