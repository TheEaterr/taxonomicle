import { getTaxonData } from '$lib/pocketBase';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return getTaxonData('Q729___________');
};
