import { getRandomGoalTaxon, getTaxonData } from '$lib/pocketBase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goalTaxon = await getRandomGoalTaxon();
	const animaliaTaxon = await getTaxonData('Q729___________', goalTaxon.taxon.path);
	return {
		goalTaxon,
		animaliaTaxon
	};
};
