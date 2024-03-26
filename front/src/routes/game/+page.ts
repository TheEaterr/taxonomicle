import { getGoalTaxon } from '$lib/pocketBase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const goalTaxon = await getGoalTaxon();
	return {
		...goalTaxon
	};
};
