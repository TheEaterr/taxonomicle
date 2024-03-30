/* eslint-disable @typescript-eslint/no-var-requires */
const taxons = require('./src/lib/taxons.js');

const colors = taxons.reduce((acc, taxon) => {
	acc[taxon] = `hsl(var(--${taxon}) / <alpha-value>)`;
	acc[`${taxon}-content`] = `hsl(var(--${taxon}-content) / <alpha-value>)`;
	return acc;
}, {});

const daisyColorsLight = taxons.reduce((acc, taxon) => {
	acc[`--${taxon}`] = `var(--${taxon}1)`;
	acc[`--${taxon}-content`] = `var(--${taxon}2)`;
	return acc;
}, {});

const daisyColorsDark = taxons.reduce((acc, taxon) => {
	acc[`--${taxon}`] = `var(--${taxon}2)`;
	acc[`--${taxon}-content`] = `var(--${taxon}1)`;
	return acc;
}, {});

const safelist = taxons.reduce((acc, taxon) => {
	acc.push(`bg-${taxon}`);
	acc.push(`text-${taxon}`);
	acc.push(`border-${taxon}`);
	acc.push(`bg-${taxon}-content`);
	acc.push(`text-${taxon}-content`);
	acc.push(`border-${taxon}-content`);
	acc.push(`hover:bg-${taxon}`);
	acc.push(`hover:text-${taxon}`);
	acc.push(`hover:border-${taxon}`);
	acc.push(`hover:bg-${taxon}-content`);
	acc.push(`hover:text-${taxon}-content`);
	acc.push(`hover:border-${taxon}-content`);
	return acc;
}, []);

module.exports = {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	safelist,
	theme: {
		extend: {
			colors: {
				...colors
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#115e59',
					'primary-content': '#d0dddb',
					secondary: '#4f46e5',
					'secondary-content': '#e5dcff',
					accent: '#6ee7b7',
					neutral: '#4b5563',
					'neutral-content': '#9ca3af',
					'base-100': '#ffffff',
					info: '#3b82f6',
					success: '#84cc16',
					warning: '#facc15',
					error: '#ef4444',
					...daisyColorsLight
				},
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#d0dddb',
					'primary-content': '#115e59',
					secondary: '#e5dcff',
					'secondary-content': '#4f46e5',
					accent: '#6ee7b7',
					neutral: '#9ca3af',
					'base-100': '#374151',
					info: '#3b82f6',
					success: '#84cc16',
					warning: '#facc15',
					error: '#ef4444',
					...daisyColorsDark
				}
			}
		]
	}
};
