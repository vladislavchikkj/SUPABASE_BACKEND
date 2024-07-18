const tsConfigPaths = require('tsconfig-paths')
const path = require('path')
const moduleAlias = require('module-alias')

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

// Register module aliases
moduleAlias.addAliases({
	'@utils': path.join(__dirname, 'dist/utils'),
	'@controllers': path.join(__dirname, 'dist/controllers'),
	'@services': path.join(__dirname, 'dist/services'),
	'@routes': path.join(__dirname, 'dist/routes'),
	types: path.join(__dirname, 'dist/types'),
})

// Start the application
require('./dist/index.js')
