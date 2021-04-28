import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');

let plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
];

export default {
  input: 'src/fields/index.js',
  plugins: plugins,
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
