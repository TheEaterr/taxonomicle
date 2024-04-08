<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header/Header.svelte';
</script>

<Header onlyTheme={true} />

<main class="fixed top-0 flex min-h-screen w-screen content-center items-center justify-center">
	<div class="hero h-fit w-fit">
		<div class="hero-overlay bg-base-100"></div>
		<div class="hero-content p-10 text-center sm:p-14 lg:p-20">
			<div class="max-w-md">
				<h1 class="title text-5xl font-bold text-primary sm:text-6xl lg:text-7xl">Taxonomicle</h1>
				<div class="m-3 mt-5">
					<button on:click={() => goto('/game/daily')} class="btn-primary-special main-btn btn"
						>Daily</button
					>
					<button
						on:click={() => goto('/game/endless')}
						class="btn-secondary-special main-btn btn ml-5">Endless</button
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

<style lang="postcss">
	.main-btn {
		@apply text-lg sm:btn-lg;
	}

	.title {
		-webkit-text-stroke: 2px oklch(var(--nc));
	}
</style>
