/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#115e59',
					secondary: '#4f46e5',
					accent: '#6ee7b7',
					neutral: '#4b5563',
					'base-100': '#ffffff',
					info: '#3b82f6',
					success: '#84cc16',
					warning: '#facc15',
					error: '#ef4444'
				},
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#115e59',
					secondary: '#4f46e5',
					accent: '#6ee7b7',
					neutral: '#9ca3af',
					'base-100': '#374151',
					info: '#3b82f6',
					success: '#84cc16',
					warning: '#facc15',
					error: '#ef4444'
				}
			}
		]
	}
};
