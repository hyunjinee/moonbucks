import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = (_, argv) => ({
  entry: ['./src/index.ts', './src/css/index.css'],
  output: {
    filename: 'index.js',
    path: path.resolve(dirname, 'dist'),
    clean: {
      keep: /\.git/,
    },
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
});

export default config;
