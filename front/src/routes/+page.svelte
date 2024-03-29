<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main class="flex min-h-screen content-center items-center justify-center">
	<div class="hero h-fit w-fit">
		<div class="hero-overlay bg-base-100"></div>
		<div class="hero-content p-10 text-center sm:p-14 lg:p-20">
			<div class="max-w-md">
				<h1 class="title text-5xl font-bold text-primary sm:text-6xl lg:text-7xl">Taxonomicle</h1>
				<div class="m-5">
					<button
						on:click={() => goto('/game/daily')}
						class="btn btn-primary bg-primary-content text-lg font-bold text-neutral hover:text-primary-content"
						>Daily</button
					>
					<button
						on:click={() => goto('/game/endless')}
						class="btn btn-secondary ml-5 bg-secondary-content text-lg font-bold text-neutral hover:text-secondary-content"
						>Endless</button
					>
				</div>
				<div class="m-5">
					<button
						on:click={() => goto('/game/tutorial')}
						class="btn btn-neutral bg-neutral-content font-bold text-neutral hover:text-neutral-content"
						>How to play</button
					>
					<button
						on:click={() => goto('/game/endless')}
						class="btn btn-neutral ml-5 bg-neutral-content font-bold text-neutral hover:text-neutral-content"
						>Endless</button
					>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.title {
		-webkit-text-stroke: 2px oklch(var(--nc));
	}
</style>
