/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const path = require('path');
const tailwindConfig = path.join(__dirname, 'tailwind.config.cjs');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss({ config: tailwindConfig }),
		//But others, like autoprefixer, need to run after,
		autoprefixer
	]
};

module.exports = config;
