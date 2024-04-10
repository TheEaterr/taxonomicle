import { getGoalTaxonData, getTaxonData } from '$lib/pocketBase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goalTaxon = await getGoalTaxonData('Q1790887_______');
	const animaliaTaxon = await getTaxonData('Q729___________', goalTaxon.taxon.path);
	return {
		goalTaxon,
		animaliaTaxon
	};
};
