import PocketBase, { type ListResult, type RecordService } from 'pocketbase';
import type {
	RandomBigTaxonResponse,
	RankResponse,
	ReportResponse,
	TaxonResponse,
	UsersResponse
} from './generated/pocketBaseTypes';
import { cyrb128 } from './hash';

const TAXON_DESCRIPTION_FIELDS = '*,description:excerpt(700,true)';
const TAXON_SHORT_DESCRIPTION_FIELDS = '*,description:excerpt(250,true)';

// Override TaxonResponse directly to forbid null path
type TaxonResponseFull<Texpand = unknown> = TaxonResponse<unknown, Texpand> & {
	path: string[];
};

type TexpandRank = {
	rank: RankResponse;
};

type TexpandParent<Texpand = unknown> = {
	parent: TaxonResponseFull<TexpandRank & Texpand>;
};

// Overriden TypedPocketBase to include json type definitions
type TypedPocketBase = PocketBase & {
	collection(idOrName: 'taxon'): RecordService<TaxonResponseFull>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
	collection(idOrName: 'rank'): RecordService<RankResponse>;
	collection(idOrName: 'report'): RecordService<ReportResponse>;
	collection(idOrName: 'random_big_taxon'): RecordService<RandomBigTaxonResponse>;
};

const API_URL =
	process.env.NODE_ENV === 'production' ? 'https://taxonomicle.maoune.fr' : 'http://127.0.0.1:8090';
const pb = new PocketBase(API_URL) as TypedPocketBase;

const MAX_CHILDREN = 20;

export const getTaxonData = async (id: string, path: string[]) => {
	const taxonId = id;
	const taxonPromise = pb
		.collection('taxon')
		.getOne<
			TaxonResponseFull<TexpandRank & TexpandParent>
		>(taxonId, { expand: 'rank,parent,parent.rank', fields: TAXON_DESCRIPTION_FIELDS });
	const taxonIndex = path.indexOf(id);
	let children: ListResult<TaxonResponseFull<TexpandRank>>;
	let taxon: Awaited<typeof taxonPromise>;
	if (taxonIndex >= 0 && taxonIndex < path.length - 1) {
		// We do a seperate query for the children to guarantee it to be in the final result
		const childPromise = pb
			.collection('taxon')
			.getOne<TaxonResponseFull<TexpandRank>>(path[taxonIndex + 1], {
				expand: 'rank',
				fields: TAXON_SHORT_DESCRIPTION_FIELDS
			});
		const childrenPromise = pb
			.collection('taxon')
			.getList<TaxonResponseFull<TexpandRank>>(1, MAX_CHILDREN - 1, {
				filter: `parent = "${taxonId}" && id != "${path[taxonIndex + 1]}"`,
				expand: 'rank',
				sort: 'rank.order,@random',
				fields: TAXON_SHORT_DESCRIPTION_FIELDS
			});
		const [_taxon, child, otherChildren] = await Promise.all([
			taxonPromise,
			childPromise,
			childrenPromise
		]);
		taxon = _taxon;
		otherChildren.items.push(child);
		otherChildren.totalItems += 1;
		children = otherChildren;
	} else {
		const childrenPromise = pb
			.collection('taxon')
			.getList<TaxonResponseFull<TexpandRank>>(1, MAX_CHILDREN, {
				filter: `parent = "${taxonId}"`,
				expand: 'rank',
				sort: 'rank.order,@random',
				fields: TAXON_SHORT_DESCRIPTION_FIELDS
			});
		[taxon, children] = await Promise.all([taxonPromise, childrenPromise]);
	}

	const overflown = children.totalItems > MAX_CHILDREN;
	// sorting children by order and alphabetically
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

const getTaxonFilter = (parent: string) =>
	`rank.name = "species" && image_path=true && path ~ "${parent}"`;

const getRandomParent = (index: number) => {
	return pb
		.collection('random_big_taxon')
		.getFirstListItem<RandomBigTaxonResponse>(`${index} < probability`, {
			sort: '+probability'
		});
};

export const getDailyGoalTaxon = async () => {
	const oneDay = 24 * 60 * 60 * 1000;
	const initialDate = new Date(2001, 12, 10);
	const currentDate = new Date();
	initialDate.setHours(0, 0, 0);
	currentDate.setHours(0, 0, 0);
	const diffDays = Math.round(Math.abs((currentDate.getTime() - initialDate.getTime()) / oneDay));
	console.log('diffDays', diffDays);
	// Hash the date
	const hash = cyrb128(
		(currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear()).toString()
	);
	// 10000 is the magic number we use for probabilistic query of a single record
	const randomParentIndex = (2999 * diffDays) % 10000;
	const parent = await getRandomParent(randomParentIndex);
	const randomTaxonIndex = Math.floor(hash[0] % parent.count);
	const taxon = (
		await pb.collection('taxon').getList<TaxonResponseFull<TexpandRank>>(randomTaxonIndex, 1, {
			expand: 'rank',
			filter: getTaxonFilter(parent.taxon),
			skipTotal: true,
			fields: TAXON_DESCRIPTION_FIELDS
		})
	).items[0];

	return taxon;
};

export const getRandomGoalTaxon = async () => {
	const randomParentIndex = Math.floor(Math.random() * 10000);
	const parent = await getRandomParent(randomParentIndex);
	const taxon = await pb
		.collection('taxon')
		.getFirstListItem<TaxonResponseFull<TexpandRank>>(getTaxonFilter(parent.taxon), {
			expand: 'rank',
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
