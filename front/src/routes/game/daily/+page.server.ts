import { getGoalTaxon, getTaxonData } from '$lib/pocketBase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goalTaxon = await getGoalTaxon();
	const animaliaTaxon = await getTaxonData('Q729___________');
	return {
		goalTaxon,
		animaliaTaxon
	};
};
