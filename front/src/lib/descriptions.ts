const crappyCache: Record<string, string> = {};

const reduceDescription = (description: string) => {
	const shortThreshold = 200;
	const longThreshold = 700;
	const longDescription =
		description.length > longThreshold ? description.slice(0, longThreshold) + '...' : description;
	const shortDescription =
		description.length > shortThreshold
			? description.slice(0, shortThreshold) + '...'
			: description;
	return {
		short: shortDescription,
		long: longDescription
	};
};

const wikiAPIEndpoint = 'https://en.wikipedia.org/w/api.php';
const wikiParams = 'format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
export const getDescriptions = async (
	titles: string[]
): Promise<Record<string, { short: string; long: string }>> => {
	if (crappyCache[titles.join('|')]) {
		console.log('Using cached descriptions for', titles);
		return JSON.parse(crappyCache[titles.join('|')]);
	}
	console.log('Fetching descriptions for', titles);
	const response = await fetch(wikiAPIEndpoint + '?' + wikiParams + titles.join('|') + '&origin=*');
	const responseJson = await response.json();
	const pages = responseJson.query.pages;
	const redirects: Record<string, string> = {};
	if (responseJson.query.redirects) {
		responseJson.query.redirects.forEach((element: { to: string; from: string }) => {
			redirects[element.from] = element.to;
		});
	}
	const descriptions: Record<string, { short: string; long: string }> = {};
	const descriptionPlaceholder = 'No description available.';
	Object.keys(pages).forEach((key) => {
		const page = pages[key];
		descriptions[page.title] = page.extract
			? reduceDescription(page.extract)
			: { short: descriptionPlaceholder, long: descriptionPlaceholder };
	});
	titles.forEach((title) => {
		if (!descriptions[title] && redirects[title]) {
			descriptions[title] = descriptions[redirects[title]];
		}
	});
	crappyCache[titles.join('|')] = JSON.stringify(descriptions);
	return descriptions;
};
