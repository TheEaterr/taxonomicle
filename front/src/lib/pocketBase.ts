import PocketBase from 'pocketbase';
import type { TaxonResponse } from './generated/pocketBaseTypes';

const pb = new PocketBase('http://127.0.0.1:8090');

const wikiAPIEndpoint = 'https://en.wikipedia.org/w/api.php';
const wikiParams = 'format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
const getDescription = async (title: string): Promise<string> => {
	const response = await fetch(wikiAPIEndpoint + '?' + wikiParams + title + '&origin=*');
	const responseJson = await response.json();
	return responseJson.query.pages[Object.keys(responseJson.query.pages)[0]].extract;
};

export const getTaxonData = async (id: string) => {
	const taxonId = id;
	const taxon = await pb.collection<TaxonResponse>('taxon').getOne(taxonId);
	// We have to make a seperate query for the random sort
	const children = await pb.collection<TaxonResponse>('taxon').getList(1, 50, {
		filter: `parent = "${taxonId}"`,
		sort: '@random'
	});
	// TODO sort according to rank then scientific name
	children.items = children.items.sort((a, b) => a.scientific.localeCompare(b.scientific));
	const description = await getDescription(taxon.site_link);

	return {
		id,
		taxon,
		children,
		description
	};
};

export const getGoalTaxon = async () => {
	const taxon = await pb.collection<TaxonResponse>('taxon').getFirstListItem('image_path=true', {
		filter: 'rank = "species"'
	});
	console.log(taxon);
	const description = await getDescription(taxon.site_link);

	return {
		taxon,
		description
	};
};

export default pb;
