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

export const getTaxonData = async (id: string, path: string[]) => {
	const taxonId = id;
	const taxon = await pb.collection<TaxonResponse>('taxon').getOne(taxonId);
	// We have to make a seperate query for the random sort
	const children = await pb.collection<TaxonResponse>('taxon').getList(1, 20, {
		filter: `parent = "${taxonId}"`,
		sort: '@random'
	});
	let overflown = false;
	if (children.items.length == 20) {
		const indexOnPath = path.indexOf(taxonId);
		if (indexOnPath !== -1 && indexOnPath !== 0) {
			const nextTaxon = path[indexOnPath - 1];
			if (children.items.findIndex((child) => child.id === nextTaxon) === -1) {
				children.items.pop();
				children.items.push(await pb.collection<TaxonResponse>('taxon').getOne(nextTaxon));
				console.log('added manually to children: ', nextTaxon);
			}
			overflown = true;
		}
	}
	// TODO sort according to rank then scientific name
	children.items = children.items.sort((a, b) => a.scientific.localeCompare(b.scientific));
	const description = await getDescription(taxon.site_link);

	return {
		id,
		taxon,
		children,
		description,
		overflown
	};
};

// Simple hash function taken from
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
export const cyrb128 = (str: string) => {
	let h1 = 1779033703,
		h2 = 3144134277,
		h3 = 1013904242,
		h4 = 2773480762;
	for (let i = 0, k; i < str.length; i++) {
		k = str.charCodeAt(i);
		h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
		h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
		h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
		h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
	}
	h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
	h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
	h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
	h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
	(h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
	return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
};

const getCorrectPath = async (taxon: TaxonResponse) => {
	const path = [taxon.id];
	let current = taxon;
	while (current.parent) {
		path.push(current.parent);
		current = await pb.collection<TaxonResponse>('taxon').getOne(current.parent);
	}
	return path;
};

export const getGoalTaxon = async () => {
	const availableTaxons = await pb.collection<TaxonResponse>('taxon').getList(1, 1, {
		filter: 'rank = "species" && image_path=true'
	});
	const totalAvailable = availableTaxons.totalItems;
	const currentDate = new Date();
	// Hash the date
	const hash = cyrb128(
		(currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear()).toString()
	);
	const randomIndex = Math.floor((hash[0] % totalAvailable) + 1);
	const taxon = (
		await pb.collection<TaxonResponse>('taxon').getList(randomIndex, 1, {
			filter: 'rank = "species" && image_path=true',
			skipTotal: true
		})
	).items[0];
	const description = await getDescription(taxon.site_link);
	const path = await getCorrectPath(taxon);

	return {
		taxon,
		description,
		path
	};
};

export const getRandomGoalTaxon = async () => {
	const taxon = await pb.collection<TaxonResponse>('taxon').getFirstListItem('', {
		filter: 'rank = "species" && image_path=true',
		sort: '@random'
	});
	const description = await getDescription(taxon.site_link);
	const path = await getCorrectPath(taxon);

	return {
		taxon,
		description,
		path
	};
};

export const getGoalTaxonData = async (id: string) => {
	const taxon = await pb.collection<TaxonResponse>('taxon').getOne(id);
	const description = await getDescription(taxon.site_link);
	const path = await getCorrectPath(taxon);

	return {
		taxon,
		description,
		path
	};
};

export default pb;
