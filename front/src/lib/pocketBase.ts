import PocketBase, { type RecordService } from 'pocketbase';
import type {
	RankResponse,
	ReportResponse,
	TaxonResponse,
	UsersResponse
} from './generated/pocketBaseTypes';

const TAXON_DESCRIPTION_FIELDS = '*,description:excerpt(700,true)';

export const reduceDescription = (description: string) => {
	const shortThreshold = 250;
	const shortDescription =
		description.length > shortThreshold
			? description.slice(0, shortThreshold) + '...'
			: description;
	return shortDescription;
};

// Override TaxonResponse directly to forbid null path
type TaxonResponseFull<Texpand = unknown> = TaxonResponse<unknown, Texpand> & {
	path: string[];
};

type TexpandRank = {
	rank: RankResponse;
};

type TexpandParent = {
	parent: TaxonResponseFull<TexpandRank>;
};

// Overriden TypedPocketBase to include json type definitions
type TypedPocketBase = PocketBase & {
	collection(idOrName: 'taxon'): RecordService<TaxonResponseFull>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
	collection(idOrName: 'rank'): RecordService<RankResponse>;
	collection(idOrName: 'report'): RecordService<ReportResponse>;
};

const API_URL =
	process.env.NODE_ENV === 'production' ? 'https://taxonomicle.maoune.fr' : 'http://127.0.0.1:8090';
const pb = new PocketBase(API_URL) as TypedPocketBase;

// Wikipedia API has a limit of 20 titles per request
const MAX_CHILDREN = 19;

export const getTaxonData = async (id: string, path: string[]) => {
	const taxonId = id;
	const taxon = await pb
		.collection('taxon')
		.getOne<
			TaxonResponseFull<TexpandRank & TexpandParent>
		>(taxonId, { expand: 'rank,parent,parent.rank', fields: TAXON_DESCRIPTION_FIELDS });
	// We have to make a seperate query for the random sort
	const children = await pb
		.collection('taxon')
		.getList<TaxonResponseFull<TexpandRank>>(1, MAX_CHILDREN, {
			filter: `parent = "${taxonId}"`,
			expand: 'rank',
			sort: 'rank.order,@random',
			fields: TAXON_DESCRIPTION_FIELDS
		});
	const overflown = children.totalItems > MAX_CHILDREN;
	if (children.items.length == MAX_CHILDREN) {
		const indexOnPath = path.indexOf(taxonId);
		if (indexOnPath !== -1 && indexOnPath < path.length - 1) {
			const nextTaxon = path[indexOnPath + 1];
			if (children.items.findIndex((child) => child.id === nextTaxon) === -1) {
				children.items.pop();
				children.items.push(
					await pb.collection('taxon').getOne<TaxonResponseFull<TexpandRank>>(nextTaxon, {
						expand: 'rank',
						fields: TAXON_DESCRIPTION_FIELDS
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

	return {
		id,
		taxon,
		children,
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

const rankThreshold = 30;
const parentFilter = `rank.order > ${rankThreshold}  && parent.rank.order <= ${rankThreshold} && image_path=true`;
const getTaxonFilter = (parent: string) =>
	`rank.name = "species" && image_path=true && path ~ "${parent}"`;

export const getGoalTaxon = async () => {
	const currentDate = new Date();
	// Hash the date
	const hash = cyrb128(
		(currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear()).toString()
	);

	const availableParents = await pb
		.collection('taxon')
		.getList<TaxonResponseFull<TexpandRank>>(1, 1, {
			expand: 'rank',
			filter: parentFilter,
			fields: TAXON_DESCRIPTION_FIELDS
		});
	const totalAvailableParents = availableParents.totalItems;
	const randomParentIndex = Math.floor(hash[0] % totalAvailableParents);
	const parent = (
		await pb.collection('taxon').getList<TaxonResponseFull<TexpandRank>>(randomParentIndex, 1, {
			expand: 'rank',
			filter: parentFilter,
			skipTotal: true,
			fields: TAXON_DESCRIPTION_FIELDS
		})
	).items[0];
	const availableTaxons = await pb
		.collection('taxon')
		.getList<TaxonResponseFull<TexpandRank>>(1, 1, {
			expand: 'rank',
			filter: getTaxonFilter(parent.id),
			fields: TAXON_DESCRIPTION_FIELDS
		});
	const totalAvailableTaxon = availableTaxons.totalItems;
	const randomTaxonIndex = Math.floor(hash[1] % totalAvailableTaxon);
	const taxon = (
		await pb.collection('taxon').getList<TaxonResponseFull<TexpandRank>>(randomTaxonIndex, 1, {
			expand: 'rank',
			filter: getTaxonFilter(parent.id),
			skipTotal: true,
			fields: TAXON_DESCRIPTION_FIELDS
		})
	).items[0];

	return taxon;
};

export const getRandomGoalTaxon = async () => {
	// we first randomly select a random taxon roughly equivalent to a class for more variety
	const parent = await pb.collection('taxon').getFirstListItem('', {
		expand: 'rank,parent,parent.rank',
		filter: parentFilter,
		sort: '@random',
		fields: TAXON_DESCRIPTION_FIELDS
	});
	console.log(parent);
	const taxon = await pb.collection('taxon').getFirstListItem<TaxonResponseFull<TexpandRank>>('', {
		expand: 'rank',
		filter: getTaxonFilter(parent.id),
		sort: '@random',
		fields: TAXON_DESCRIPTION_FIELDS
	});

	return taxon;
};

export const getGoalTaxonData = async (id: string) => {
	const taxon = await pb.collection('taxon').getOne<TaxonResponseFull<TexpandRank>>(id, {
		expand: 'rank',
		fields: TAXON_DESCRIPTION_FIELDS
	});

	return taxon;
};

export const createReport = async (taxonId: string, description: string) => {
	const data = {
		taxon: taxonId,
		description
	};

	const record = await pb.collection('report').create(data);
	return record;
};

export default pb;
