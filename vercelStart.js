const tsConfigPaths = require('tsconfig-paths')

// Register tsconfig paths
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

// Start the application
require('./dist/index.js')
