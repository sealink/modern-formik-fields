const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// externals: {
//   react: 'react',
//   reactDOM: 'react-dom',
//   'react-dom': 'react-dom',
//   moment: 'moment',
//   'react-select': 'react-select',
//   'react-dates': 'react-dates',
// },

const config = {
  entry: {
    index: './src/fields/index.js',
  },
  externals: {
    react: 'react',
    reactDOM: 'react-dom',
    'react-dom': 'react-dom',
    moment: 'moment',
    'react-select': 'react-select',
    'react-dates': 'react-dates',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'modern-formik-fields.js',
    library: 'modern-formik-fields',
    libraryTarget: 'commonjs',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: [/node_modules/, /test/],
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // * add some development rules here
  } else if (argv.mode === 'production') {
    // * add some prod rules here
  } else {
    throw new Error('Specify env');
  }

  return config;
};
