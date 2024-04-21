<script lang="ts">
	import TutorialAlert from '$lib/components/tutorial/TutorialAlert.svelte';

	export let currentTaxonId: string;
	export let path: string[];
</script>

{#if currentTaxonId === path[0]}
	<TutorialAlert>
		You are now a the root of the tree. Notice the information about the current taxon (here
		animalia) above this notice. During the game, you will need to compare this information with the
		goal taxon to verify you are in the right track!
		<br />
		Now the first step should be quite easy. You have to click on one of the two options below. In black
		is the scientific name of the taxon and in grey is the common name (if it exists).
		<br />
		<div class="text-sm text-gray-700">
			Hint: the fish we are dealing with is a fish and not a sponge!
		</div>
	</TutorialAlert>
{:else if currentTaxonId === path[1]}
	<TutorialAlert>
		Now here comes the first difficulty...
		<br />
		Although you can see 5 options, in most cases you only need to choose between Deuterostomia and Protostomia.
		The first one contains mostly vertebrates and starfishes, while the second one includes arthropods,
		molluscs, annelids and more.
		<br />
		<div class="text-sm text-gray-700">
			The other categories contain various forms of weird lifeforms, like jellyfishes for example!
		</div>
	</TutorialAlert>
{:else if currentTaxonId === path[2]}
	<TutorialAlert>
		Pfiou, this one is a bit easier.
		<br />
		You can read a small description of the various childs by hovering (or clicking on mobile) on the
		question mark next to each button. Read the three descriptions and deduce the right answer!
		<br />
	</TutorialAlert>
{:else if currentTaxonId === path[3]}
	<TutorialAlert
		>You got this one so here is another tip.
		<br />
		Taxon names are all in latin which can make them hard to understand, but it can also render them
		self-explanatory. For example, insects are all contained in the subphylum hexopoda, which means 6
		limbs! There is also the super class myriapoda that contains millipedes and centipedes.</TutorialAlert
	>
{:else if currentTaxonId === path[4]}
	<TutorialAlert
		>You probably never heard of those two names but reading the descriptions will make quick work
		of this choice.</TutorialAlert
	>
{:else if currentTaxonId === path[5]}
	<TutorialAlert
		>Now it becomes interesting... Finding the correct class and order is often when Taxonomicle
		becomes hard. Here is a small tip: children are displayed in the order of their rank (a class
		will be displayed before an order for example). When you are at a loss, it is often a good idea
		to pick a taxon of the highest rank!
	</TutorialAlert>
{:else if currentTaxonId === path[6]}
	<TutorialAlert>
		This is the hardest choice of this game.
		<br />
		I will give you a tip: the goal is actually a Holostei! By reading the description, this should be
		enough to find the right answer. Great job, this one will not give you any trouble.
	</TutorialAlert>
{:else if currentTaxonId === path[7]}
	<TutorialAlert>
		Great job, with what you know now, this one will not give you any trouble.
		<br />
		I will let you in on a little secret. You will find that Taxonomicle's data isn't perfect, and sometimes
		it isn't coherent with what is said in the description. Taxonomy is very hard and is always changing
		as biologists try to improve the classification. Some choices cause wide debates between scientists!
		To play Taxonomicle, you need to stay flexible and not hesitate to make mistakes. If you find any
		problem in the data, do not hesitate to report it using the button at the top left of your window,
		to make Taxonomicle better for everyone!
	</TutorialAlert>
{:else if currentTaxonId === path[8]}
	<TutorialAlert
		>Now the rest is easy, especially this one.<br />Here is another tip for you. Some taxons are a
		lot harder to find than others. For example, amphibians tend to be quite straightforward, while
		there are multiple orders and even subclasses of snails that all look the same!
	</TutorialAlert>
{:else if currentTaxonId === path[9]}
	<TutorialAlert
		>Another easy one...<br />You can also see that often, the name of a taxon is simply the name of
		one of its children, using a different latin suffix depending on its rank!
	</TutorialAlert>
{:else if currentTaxonId === path[10]}
	<TutorialAlert
		>And here is the final tip, the scientific name of a species is always two latin words. The
		first one is its genus, and the last one its name in the genus.
	</TutorialAlert>
{:else if currentTaxonId === path[11]}
	<TutorialAlert
		>Congratulations! Now to try the game for real, click on the button below. It will take you to
		the daily mode, where a random species is generated each day, the same for everyone. You can
		also try endless mode, where you can play as much as you want.
	</TutorialAlert>
{:else if !path.includes(currentTaxonId)}
	<TutorialAlert isWarning>
		Uh-oh! I'm afraid you deviated from the right path 😿.
		<br />
		Climb back up the tree until this message disappears!
	</TutorialAlert>
{/if}
