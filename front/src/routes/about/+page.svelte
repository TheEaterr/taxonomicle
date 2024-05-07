<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import { IconInfoCircle, IconExternalLink } from '@tabler/icons-svelte';
</script>

<svelte:head>
	<title>About - Taxonomicle</title>
	<meta
		name="description"
		content="Learn how Taxonomicle, a daily game where you have to find a species in the tree of life, was made."
	/>
</svelte:head>

<Header reset={undefined} />

<div class="w-full text-center">
	<article class="prose m-5 inline-block max-w-[120ch] bg-base-100">
		<h3 class="small-title text-3xl font-bold text-primary">About Taxonomicle</h3>
		<hr class="h-[1px] rounded bg-neutral" />
		<div class="text-justify">
			<p>
				Taxonomicle is a project made to try and have fun around taxonomy. The website is fully open
				source and both the <a
					href="https://github.com/TheEaterr/taxonomicle"
					target="_blank"
					rel="noopener"
					class="link">website code<IconExternalLink class="inline" size={15} /></a
				>
				and
				<a
					href="https://github.com/TheEaterr/taxonomicle-data-import"
					target="_blank"
					rel="noopener"
					class="link">code for importing data<IconExternalLink class="inline" size={15} /></a
				> are available on github. The website was fully coded as a side project by Eaterr, currently
				an engineering student, with the help of Aslerioth, a paleontology PhD student and scientific
				advisor of the project.
			</p>
			<h3>Creating the dataset</h3>
			<p>
				Taxonomicle uses data from the Wikimedia foundation for all the information shown in the
				website. The tree of life itself was extracted from Wikidata, using information from the <a
					href="https://www.wikidata.org/wiki/Wikidata:WikiProject_Taxonomy"
					target="_blank"
					rel="noopener"
					class="link">WikiProject Taxonomy<IconExternalLink class="inline" size={15} /></a
				>. In short, this project gives a centralized and computer friendly way to store taxonomic
				data and use it across Wikimedia projects. For example, it is what powers the taxonomic data
				block found in every taxon Wikipedia page. This dataset also gives access to images for the
				different taxa, through Wikimedia Commons. Finally, the description for each taxon was
				imported from the introduction of its Wikipedia page.
			</p>
			<span role="alert" class="alert max-w-screen-lg border-base-300 bg-base-300">
				<IconInfoCircle size={30} class="text-info" />
				<span>
					<h4 class="mt-0">Why Wikipedia?</h4>
					<span class="inline-block text-justify"
						>People invested in taxonomy will know that there exist a lot of checklists and datasets
						of the living (like the encyclopedia of life, GBIF, ...). All of these being both more
						scientifically accurate and easier to work with than Wikipedia. However, all of these
						datasets only provide various images and descriptions for species and not other clades.
						For Taxonomicle to be playable, every taxon in the dataset needs a description and - if
						possible - an image that define them. Wikipedia being an encyclopedia is the only source
						of data providing such descriptions.
					</span>
				</span>
			</span>
			<p>
				Using this taxonomic data sadly proved challenging as it is meant to be exhaustive rather
				than coherent. For example, many taxa have several parents and ranks. The first step in
				building the dataset is to make it into a tree. For this, we choose for each taxon the
				parent that gives it the longest path back to animalia (the node at the top of the tree).
				This was found to be best as it gave the most exhaustive results. All taxa that have no
				ranks were also removed. This allows preventing the game from being too hard and tedious,
				where each taxon is 30 steps away from the top of the tree. It also to have a more uniform
				tree and to always give rank information to the player. Progression is thus more satisfying
				and the player always knows how far away from the goal they are. Moreover, this information
				is very useful when related with the descriptions and makes the game much more enjoyable.
			</p>
			<span role="alert" class="alert max-w-screen-lg border-base-300 bg-base-300">
				<IconInfoCircle size={30} class="text-info" />
				<span>
					<h4 class="mt-0">The ranks that were kept</h4>
					<span class="inline-block text-justify"
						>Ranks in taxonomy were inherited from the Linnaean classification. Numerous extensions
						and subdivisions of these ranks exist. For simplicity's sake, only ones with significant
						presence in the data were kept. The ranks used in Taxonomicle are kingdom, subkingdom,
						infrakingdom, superphylum, phylum, subphylum, infraphylum, superclass, class, subclass,
						infraclass, superorder, order, suborder, infraorder, pavorder, superfamily, family,
						subfamily, tribe, subtribe, genus, subgenus and species.
					</span>
				</span>
			</span>
			<p>
				This sadly does not give a coherent tree and more than a hundred manual data fixes (either
				directly in Wikidata or in the import code) had to be put in place. Finally, all taxa that
				are not linked to a Wikipedia page are also removed. This makes the data in Taxonomicle
				inherently partial and Taxonomicle does not try to reach any scientific accuracy.
				Nevertheless, if a taxon is parent of another in Taxonomicle, it can be assumed this
				hierarchy is reasonable (though maybe debated or outdated). The main problem that was not
				able to be solved is the existence of taxa side-by-side that should have a hierarchical
				link.
			</p>
			<h3>Generating a goal taxon</h3>
			<p>
				Generating a random goal taxon is more difficult than one might think at first glance. Just
				selecting a random species only mostly gives insects and gastropods and does not offer much
				variety. What is instead done is we first choose a random class (a choice lightly weighted
				with the number of species in the class) then we choose a random species inside that class.
				For the generation of the daily taxon, we go one step further and sort classes according to
				their proximity in the full tree. When we choose the taxon for the next day, we choose a
				class much further in the list, so there never is two similar taxa two days in a row.
			</p>
			<h3>Building the website</h3>
			<p>
				The website is built using Svelte and SvelteKit for the frontend, PocketBase for the backend
				and is styled by Tailwind and daisyUI.
			</p>
		</div>
	</article>
</div>
