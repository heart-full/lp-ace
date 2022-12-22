// A config for `generateSW`
export default {
	globDirectory: './docs/',
	globPatterns: [
		'./docs/*.html',
		'./docs/assets/**/*.{js,css,jpg,jpeg,png,svg,ico}'
	],
	swDest: './src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
}
