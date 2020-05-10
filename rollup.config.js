import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
	input: 'lib/index.js',
	output: {
		file: 'dist/build.js',
		format: 'umd',
		name: 'animateProps',
		exports: 'named'
	},
	plugins: [
		// Changes package path to relative
		resolve(),
		// Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
		commonjs(),
		babel()
	],
	watch: {
		include: 'lib/**/*.js',
		exclude: 'node_modules/**'
	}
}
