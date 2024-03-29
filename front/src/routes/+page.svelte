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
						class="btn-primary-special btn text-lg sm:btn-lg">Daily</button
					>
					<button
						on:click={() => goto('/game/endless')}
						class="btn-secondary-special btn ml-5 text-lg sm:btn-lg">Endless</button
					>
				</div>
				<div>
					<button on:click={() => goto('/tutorial')} class="btn-neutral-special btn btn-sm"
						>How to play</button
					>
					<button on:click={() => goto('/about')} class="btn-neutral-special btn btn-sm ml-1"
						>About</button
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
