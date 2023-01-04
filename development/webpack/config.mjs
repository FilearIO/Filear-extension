import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import resolvePath from '../utils/resolvePath.mjs'
import packageInfo from '../../package.json' assert { type: 'json' }

const version = packageInfo.version

export default function (env) {
  const isDEV = env === 'development'

  return {
    cache: isDEV
      ? {
          type: 'filesystem',
        }
      : false,
    mode: isDEV ? 'development' : 'production',
    devtool: 'cheap-module-source-map',

    entry: {
      popup: './src/views/entries/popup.tsx',
      home: './src/views/entries/popup.tsx',
      background: './src/background',
      'content-script': './src/content',
      'injected-script': './src/injected',
    },
    output: {
      path: resolvePath('build'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset',
          generator: { filename: 'img/[hash:10][ext][query]' },
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  auto: resourcePath => resourcePath.endsWith('.module.scss'),
                  localIdentName: '[folder]-[local]-[hash:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@': resolvePath('src'),
        '@arshare/cravis': resolvePath('src/views/cravis'),
        '@shared': resolvePath('src/shared'),
        '@views': resolvePath('src/views'),
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new webpack.DefinePlugin({
        APP_NAME: JSON.stringify('Filear'),
        APP_VERSION: JSON.stringify(version),
      }),
      new HtmlWebpackPlugin({
        chunks: ['popup'],
        filename: 'popup.html',
        template: resolvePath('app/popup.html'),
        inject: 'body',
      }),
      new HtmlWebpackPlugin({
        chunks: ['home'],
        filename: 'home.html',
        template: resolvePath('app/home.html'),
        inject: 'body',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: resolvePath('app/icons'),
            to: 'icons',
          },
          resolvePath('app/manifest.json'),
          {
            from: resolvePath('app/_locales'),
            to: '_locales',
          },
        ],
      }),
    ],
  }
}
