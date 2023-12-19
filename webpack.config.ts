import path from 'path';
import webpack from 'webpack';

const cssLoaderWithModules = {
  loader: "css-loader",
  options: {
    modules: true,
  },
};
const config: webpack.Configuration = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', 'scss']
  },
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
};
export default config;
