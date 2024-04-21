import { getGoalTaxonData, getTaxonData } from '$lib/pocketBase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const goalTaxon = await getGoalTaxonData(params.id);
	const animaliaTaxon = await getTaxonData('Q729___________', goalTaxon.path);
	return {
		goalTaxon,
		animaliaTaxon
	};
};
