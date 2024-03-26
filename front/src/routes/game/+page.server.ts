import { getGoalTaxon } from '$lib/pocketBase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const endless = url.searchParams.get('endless');
	let goalTaxon: Awaited<ReturnType<typeof getGoalTaxon>> | null = null;
	if (!endless) {
		goalTaxon = await getGoalTaxon();
	}
	return {
		endless: endless === 'true',
		goalTaxon
	};
};
