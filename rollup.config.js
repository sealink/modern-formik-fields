import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
let pkg = require('./package.json');
import postcss from 'rollup-plugin-postcss';

let plugins = [
  nodeResolve(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
  }),
  postcss({ plugins: [] }),
];

export default {
  input: 'src/fields/index.js',
  plugins: plugins,
  external: [
    'react',
    'react-dom',
    'formik',
    'react-dates',
    'react-select',
    'lodash',
    'prop-types',
  ],
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'modern-formik-fields',
      sourcemapFile: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemapFile: true,
    },
  ],
};
