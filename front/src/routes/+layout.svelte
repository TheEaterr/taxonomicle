<script lang="ts">
	import '../app.pcss';
	import DecoratedBackground from '$lib/components/decorations/DecoratedBackground.svelte';
</script>

<DecoratedBackground />

<article
	class="prose min-h-screen max-w-none bg-[url('/src/lib/assets/background.svg')] bg-fixed bg-center bg-repeat-space text-center"
>
	<slot />
</article>

<style>
</style>
