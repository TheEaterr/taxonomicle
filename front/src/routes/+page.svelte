<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main class="flex min-h-screen content-center items-center justify-center">
	<div class="hero h-fit w-fit">
		<div class="hero-overlay bg-base-100"></div>
		<div class="hero-content p-10 text-center sm:p-14 lg:p-20">
			<div class="max-w-md">
				<h1 class="title text-5xl font-bold text-primary sm:text-6xl lg:text-7xl">Taxonomicle</h1>
				<div class="m-3 mt-5">
					<button
						on:click={() => goto('/game/daily')}
						class="btn btn-primary btn-lg bg-primary-content text-lg font-bold text-neutral hover:text-primary-content"
						>Daily</button
					>
					<button
						on:click={() => goto('/game/endless')}
						class="btn btn-secondary btn-lg ml-5 bg-secondary-content text-lg font-bold text-neutral hover:text-secondary-content"
						>Endless</button
					>
				</div>
				<div>
					<button
						on:click={() => goto('/tutorial')}
						class="btn btn-outline btn-neutral btn-sm font-bold text-neutral">How to play</button
					>
					<button
						on:click={() => goto('/about')}
						class="btn btn-outline btn-neutral btn-sm ml-1 font-bold text-neutral">About</button
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
