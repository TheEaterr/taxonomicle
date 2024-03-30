/* eslint-disable @typescript-eslint/no-var-requires */
const taxons = [
	'kingdom',
	'subkingdom',
	'infrakingdom',
	'superphylum',
	'phylum',
	'subphylum',
	'infraphylum',
	'superclass',
	'class',
	'subclass',
	'infraclass',
	'superorder',
	'order',
	'suborder',
	'infraorder',
	'pavorder',
	'superfamily',
	'family',
	'subfamily',
	'tribe',
	'subtribe',
	'genus',
	'subgenus',
	'species'
];

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
	const bases = ['bg', 'text', 'border'];
	const prefixes = ['', 'hover:', 'group-hover:'];
	const suffixes = ['', '-content'];
	bases.forEach((base) => {
		prefixes.forEach((prefix) => {
			suffixes.forEach((suffix) => {
				acc.push(`${prefix}${base}-${taxon}${suffix}`);
			});
		});
	});
	return acc;
}, []);

module.exports = {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	safelist,
	theme: {
		extend: {
			colors: {
				absolute: 'hsl(var(--absolute) / <alpha-value>)',
				'absolute-content': 'hsl(var(--absolute-content) / <alpha-value>)',
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
					'--absolute': '0 0 10',
					'--absolute-content': '0 0 90',
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
					'--absolute': '0 0 90',
					'--absolute-content': '0 0 10',
					...daisyColorsDark
				}
			}
		]
	}
};
