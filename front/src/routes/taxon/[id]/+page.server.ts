import pb, { type Taxon } from "$lib/pocketBase";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	const wikiAPIEndpoint = 'https://en.wikipedia.org/w/api.php';
	const wikiParams =
		'format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';

	const getDescription = async (title: string) => {
		const response = await fetch(wikiAPIEndpoint + '?' + wikiParams + title + '&origin=*');
		const responseJson = await response.json();
		return responseJson.query.pages[Object.keys(responseJson.query.pages)[0]].extract;
	};

	const taxonId = params.id;
	const taxon = await pb
		.collection<Taxon>('taxon')
		.getOne(taxonId)
	const children = await pb.collection<Taxon>('taxon').getList(1, 50, {
		filter: `parent = "${taxonId}"`
	});
	const description = await getDescription(taxon.site_link);

	return {
		id: params.id,
		taxon,
		children,
		description
	};
}
