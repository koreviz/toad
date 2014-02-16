/**
 * Toad App
 * Copyright(c) 2014 Koreviz
 * MIT Licensed
 */
var assert = require('assert'),
libpath = process.env['COVERAGE'] ? '../lib-cov' : '../lib',
toad = require(libpath + '/toad')()

module.exports = {
	'compress': {
		'should equal "þTè8¬>â<W¡-<!¦kÍZS"':
		function() {
			var str = 'Toad is a simple compression library'

			assert.equal(toad.compress(str), 'þTè8¬>â<W¡-<!¦kÍZS')
		}
	},

	'decompress': {
		'should equal "Toad is a simple compression library"':
		function() {
			var str = 'þTè8¬>â<W¡-<!¦kÍZS'

			assert.equal(toad.decompress(str), 'Toad is a simple compression library')
		}
	}
}