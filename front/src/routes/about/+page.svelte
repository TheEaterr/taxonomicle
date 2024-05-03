<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import { IconInfoCircle, IconExternalLink } from '@tabler/icons-svelte';
</script>

<Header reset={undefined} />

<div class="w-full text-center">
	<article class="prose m-5 inline-block max-w-[120ch]">
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
					href="https://github.com/TheEaterr/taxonomicle"
					target="_blank"
					rel="noopener"
					class="link">code for importing data<IconExternalLink class="inline" size={15} /></a
				> are available on github. The website was fully coded as a side project by Eaterr, currently
				an engineering student, with the help of Aslerioth, a paleontology PhD student, the scientific
				advisor of the project.
			</p>
			<h3>Creating the dataset</h3>
			<p>
				Taxonomicle uses data from the Wikimedia foundation for all the information shown in the
				website. The tree of life in itself was extracted from Wikidata, using information from the <a
					href="https://www.wikidata.org/wiki/Wikidata:WikiProject_Taxonomy"
					target="_blank"
					rel="noopener"
					class="link">WikiProject Taxonomy<IconExternalLink class="inline" size={15} /></a
				>. In short, this project gives a centralised and computer friendly way to store taxonomic
				data and use it accross Wikimedia projects. For example, it is what powers the taxonomic
				data block found in every taxon Wikipedia page. This dataset also gives access to images for
				the different taxons, through Wikimedia Commons. Finally, the description for each taxon was
				imported from the introduction of its wikipedia page.
			</p>
			<span role="alert" class="alert max-w-screen-lg border-base-300 bg-base-300">
				<IconInfoCircle size={30} class="text-info" />
				<span>
					<h4 class="mt-0">Why Wikipedia?</h4>
					<span class="inline-block text-justify"
						>People invested in taxonomy will know that there exist a lot of checklists and datasets
						of the living (like the encyclopedia of life, GBIF, ...). All of these being both more
						scientifically accurate and easier to work with than Wikipedia. However all of these
						datasets only provide various images and descriptions for species and not other clades.
						For Taxonomicle to be playable, every taxon in the dataset needs a description and - if
						possible - an image that define them. Wikipedia being an encyplopedia is the only source
						of data providing such descriptions.
					</span>
				</span>
			</span>
			<p>
				To talk about : - challenging managing the data, how it is filtered - only using certain
				ranks for enjoyable game - random generation - building the website
			</p>
		</div>
	</article>
</div>
