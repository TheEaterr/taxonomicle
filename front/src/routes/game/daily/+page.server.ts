import { getDailyGoalTaxon, getTaxonData } from '$lib/pocketBase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const goalTaxon = await getDailyGoalTaxon();
	const animaliaTaxon = await getTaxonData('Q729___________', goalTaxon.path);
	return {
		goalTaxon,
		animaliaTaxon
	};
};
