const tsConfigPaths = require('tsconfig-paths')
const path = require('path')

// Register tsconfig paths
tsConfigPaths.register({
	baseUrl: path.join(__dirname, 'dist'),
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
