import PocketBase, { RecordService } from 'pocketbase';
import type { RankResponse, TaxonResponse, UsersResponse } from './generated/pocketBaseTypes';

// Override TaxonResponse directly to forbid null path
type TaxonResponseFull<Texpand = unknown> = TaxonResponse<unknown, Texpand> & {
	path: string[];
};

type TexpandRank = {
	rank: RankResponse;
};

// Overriden TypedPocketBase to include json type definitions
type TypedPocketBase = PocketBase & {
	collection(idOrName: 'taxon'): RecordService<TaxonResponseFull>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};

const API_URL =
	process.env.NODE_ENV === 'production' ? 'https://taxonomicle.maoune.fr' : 'http://127.0.0.1:8090';
const pb = new PocketBase(API_URL) as TypedPocketBase;

const wikiAPIEndpoint = 'https://en.wikipedia.org/w/api.php';
const wikiParams = 'format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
const getDescriptions = async (titles: string[]): Promise<Record<string, string>> => {
	const response = await fetch(wikiAPIEndpoint + '?' + wikiParams + titles.join('|') + '&origin=*');
	const responseJson = await response.json();
	const pages = responseJson.query.pages;
	const redirects: Record<string, string> = {};
	if (responseJson.query.redirects) {
		responseJson.query.redirects.forEach((element: { to: string; from: string }) => {
			redirects[element.to] = element.from;
		});
	}
	const descriptions: Record<string, string> = {}; // Add type annotation for descriptions
	Object.keys(pages).forEach((key) => {
		const page = pages[key];
		const title = redirects[page.title] || page.title;
		descriptions[title] = page.extract;
	});
	return descriptions;
};

export const getTaxonData = async (id: string, path: string[]) => {
	const taxonId = id;
	const taxon = await pb
		.collection('taxon')
		.getOne<TaxonResponseFull<TexpandRank>>(taxonId, { expand: 'rank' });
	// We have to make a seperate query for the random sort
	const children = await pb.collection('taxon').getList<TaxonResponseFull<TexpandRank>>(1, 20, {
		filter: `parent = "${taxonId}"`,
		expand: 'rank',
		sort: 'rank.order,@random'
	});
	const overflown = children.totalItems > 20;
	if (children.items.length == 20) {
		const indexOnPath = path.indexOf(taxonId);
		if (indexOnPath !== -1 && indexOnPath < path.length - 1) {
			const nextTaxon = path[indexOnPath + 1];
			if (children.items.findIndex((child) => child.id === nextTaxon) === -1) {
				children.items.pop();
				children.items.push(
					await pb.collection('taxon').getOne<TaxonResponseFull<TexpandRank>>(nextTaxon, {
						expand: 'rank'
					})
				);
			}
		}
	}
	children.items = children.items.sort((a, b) => {
		const a_order = a.expand?.rank.order;
		const b_order = b.expand?.rank.order;
		if (a_order && b_order && a_order !== b_order) {
			return a_order - b_order;
		}
		return a.scientific.localeCompare(b.scientific);
	});
	const site_links = [taxon.site_link];
	children.items.forEach((child) => {
		site_links.push(child.site_link);
	});
	const descriptions = await getDescriptions(site_links);

	return {
		id,
		taxon,
		children,
		descriptions,
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

export const getGoalTaxon = async () => {
	const availableTaxons = await pb
		.collection('taxon')
		.getList<TaxonResponseFull<TexpandRank>>(1, 1, {
			expand: 'rank',
			filter: 'rank.name = "species" && image_path=true'
		});
	const totalAvailable = availableTaxons.totalItems;
	const currentDate = new Date();
	// Hash the date
	const hash = cyrb128(
		(currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear()).toString()
	);
	const randomIndex = Math.floor((hash[0] % totalAvailable) + 1);
	const taxon = (
		await pb.collection('taxon').getList<TaxonResponseFull<TexpandRank>>(randomIndex, 1, {
			expand: 'rank',
			filter: 'rank.name = "species" && image_path=true',
			skipTotal: true
		})
	).items[0];
	const descriptions = await getDescriptions([taxon.site_link]);

	return {
		taxon,
		descriptions
	};
};

export const getRandomGoalTaxon = async () => {
	const taxon = await pb.collection('taxon').getFirstListItem<TaxonResponseFull<TexpandRank>>('', {
		expand: 'rank',
		filter: 'rank.name = "species" && image_path=true',
		sort: '@random'
	});
	const descriptions = await getDescriptions([taxon.site_link]);

	return {
		taxon,
		descriptions
	};
};

export const getGoalTaxonData = async (id: string) => {
	const taxon = await pb.collection('taxon').getOne<TaxonResponseFull<TexpandRank>>(id, {
		expand: 'rank'
	});
	const descriptions = await getDescriptions([taxon.site_link]);

	return {
		taxon,
		descriptions
	};
};

export default pb;
