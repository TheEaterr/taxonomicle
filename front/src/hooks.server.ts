import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (request.url.startsWith('https://taxonomicle.com/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('https://taxonomicle.com/', 'http://taxonomicle_back:8080/'),
			request
		);
	}

	return fetch(request);
};
