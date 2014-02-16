/**
 * Toad App
 * Copyright(c) 2014 Koreviz
 * MIT Licensed
 */
var _ = require('lodash')

module.exports = function() {
	return new Toad()
}

var Toad = function() {
	this.list = [' ', 'the', 'e', 't', 'a', 'of', 'o', 'and', 'i', 'n', 's', 'e ', 'r', ' th', ' t', 'in', 'he', 'th', 'h', 'he ', 'to', '\r\n', 'l', 's ', 'd', ' a', 'an', 'er', 'c', ' o', 'd ', 'on', ' of', 're', 'of ', 't ', ', ', 'is', 'u', 'at', '   ', 'n ', 'or', 'which', 'f', 'm', 'as', 'it', 'that', '\n', 'was', 'en', '  ', ' w', 'es', ' an', ' i', '\r', 'f ', 'g', 'p', 'nd', ' s', 'nd ', 'ed ', 'w', 'ed', 'http://', 'for', 'te', 'ing', 'y ', 'The', ' c', 'ti', 'r ', 'his', 'st', ' in', 'ar', 'nt', ',', ' to', 'y', 'ng', ' h', 'with', 'le', 'al', 'to ', 'b', 'ou', 'be', 'were', ' b', 'se', 'o ', 'ent', 'ha', 'ng ', 'their', '"', 'hi', 'from', ' f', 'in ', 'de', 'ion', 'me', 'v', '.', 've', 'all', 're ', 'ri', 'ro', 'is ', 'co', 'f t', 'are', 'ea', '. ', 'her', ' m', 'er ', ' p', 'es ', 'by', 'they', 'di', 'ra', 'ic', 'not', 's, ', 'd t', 'at ', 'ce', 'la', 'h ', 'ne', 'as ', 'tio', 'on ', 'n t', 'io', 'we', ' a ', 'om', ', a', 's o', 'ur', 'li', 'll', 'ch', 'had', 'this', 'e t', 'g ', 'e\r\n', ' wh', 'ere', ' co', 'e o', 'a ', 'us', ' d', 'ss', '\n\r\n', '\r\n\r', '="', ' be', ' e', 's a', 'ma', 'one', 't t', 'or ', 'but', 'el', 'so', 'l ', 'e s', 's,', 'no', 'ter', ' wa', 'iv', 'ho', 'e a', ' r', 'hat', 's t', 'ns', 'ch ', 'wh', 'tr', 'ut', '/', 'have', 'ly ', 'ta', ' ha', ' on', 'tha', '-', ' l', 'ati', 'en ', 'pe', ' re', 'there', 'ass', 'si', ' fo', 'wa', 'ec', 'our', 'who', 'its', 'z', 'fo', 'rs', '>', 'ot', 'un', '<', 'im', 'th ', 'nc', 'ate', '><', 'ver', 'ad', ' we', 'ly', 'ee', ' n', 'id', ' cl', 'ac', 'il', '</', 'rt', ' wi', 'div', 'e, ', ' it', 'whi', ' ma', 'ge', 'x', 'e c', 'men', '.com']

	this.hash = _.reduce(this.list,
	function(memo, item, index) {
		memo[item] = index

		return memo
	}, {})

	this.len = _.last(_.sortBy(this.list, function(item) { return item.length })).length
}

Toad.prototype = {

	compress: function(str) {
		var code, match, i, index = 0, verb = '', output = [],

		fn = function(str) {
			var output = [], i = 0

	        if (str.length > 1) {
	            output.push(String.fromCharCode(255))
	            output.push(String.fromCharCode(str.length - 1))
	        } 
	        else
	        output.push(String.fromCharCode(254))

	        for (; i < str.length; i++) {
				output.push(str[i])
			}

	        return output
		}

		while (index < str.length) {
			match = false
			i = str.length - index

			i = i < this.len ? i: this.len

			for (; i > 0; i--) {
				code = this.hash[str.substr(index, i)]

				if (code != undefined) {
					if (verb) {
						output = output.concat(fn(verb))
						verb = ''
					}

					output.push(String.fromCharCode(code))
					index += i
					match = true
					break
				}
			}

			if (!match) {
				verb += str[index]
				index++

				if (verb.length == 256) {
					output = output.concat(fn(verb))
					verb = ''
				}
			}
		}

		if (verb) {
			output = output.concat(fn(verb))
			verb = ''
		}

		return output.join('')
	},

	decompress: function(str) {
		var input = [], i = 0, j, output = ''

		for (; i < str.length; i++) {
			input.push(str.charCodeAt(i))
		}

		i = 0
		while (i < input.length) {
			if (input[i] === 254) {
				// Verbatim byte
				output += str[i + 1]
				i += 2
			} 
			else if (input[i] === 255) {
				// Verbatim string
				for (j = 0; j < input[i + 1] + 1; j++) {
					output += str[i + 2 + j]
				}
				
				i += 3 + input[i + 1]
			} 
			else {
				// Codebook entry
				output += this.list[input[i]]
				i++
			}
		}

		return output
	}
}