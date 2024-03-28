/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: 'blue',
					secondary: 'teal'
				},
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: 'blue',
					secondary: 'teal'
				}
			}
		]
	}
};
