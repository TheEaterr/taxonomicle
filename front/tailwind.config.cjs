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
				absolute: 'rgb(var(--absolute) / <alpha-value>)',
				'absolute-content': 'hsla(var(--absolute-content), <alpha-value>)',
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
					accent: '#ac2c00',
					'accent-content': '#f7e1d9',
					neutral: '#4b5563',
					'neutral-content': '#bbbbcc',
					'base-100': '#ffffff',
					info: '#7cb3ff',
					success: '#84cc16',
					'success-content': '#114040',
					warning: '#facc15',
					error: '#ef4444',
					'--absolute': '#1a1a1a',
					'--absolute-content': '#e6e6e6',
					...daisyColorsLight
				},
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#d0dddb',
					'primary-content': '#115e59',
					secondary: '#e5dcff',
					'secondary-content': '#4f46e5',
					accent: '#f7e1d9',
					'accent-content': '#ac2c00',
					neutral: '#bbbbcc',
					'neutral-content': '#5c6674',
					'base-100': '#374151',
					info: '#3b82f6',
					success: '#84cc16',
					'success-content': '#114040',
					warning: '#facc15',
					error: '#ef4444',
					'--absolute': '#e6e6e6',
					'--absolute-content': '#1a1a1a',
					...daisyColorsDark
				}
			}
		]
	}
};
