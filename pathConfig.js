const tsConfigPaths = require('tsconfig-paths')

tsConfigPaths.register({
	baseUrl: './dist',
	paths: {
		'@utils/*': ['utils/*'],
		'@controllers/*': ['controllers/*'],
		'@services/*': ['services/*'],
		'@routes/*': ['routes/*'],
		'types/*': ['types/*'],
	},
})
