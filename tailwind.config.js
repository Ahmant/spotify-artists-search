/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'body': '#f8f8f8',
				'primary': '#1DB954',
				'primary-hover': '#23A752',
				'secondary': '#9191A4',
			},
			maxHeight: {
				'max': 'max-content'
			},
			minHeight: {
				'max': 'max-content'
			},
			zIndex: {
				'1000': '1000'
			}
		},
	},
	plugins: [],
}
