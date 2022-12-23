// *** webpack.config.js *** //
// PWA
import {InjectManifest} from 'workbox-webpack-plugin';

// environment variable
import process from 'process';

// __dirname is not defined in ES module scope
// solution by 
import path from 'path';

//import { Template } from 'webpack';

// simplifies creation of HTML files
// to serve your webpack bundles. 
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {HtmlWebpackSkipAssetsPlugin} from 'html-webpack-skip-assets-plugin';

//import fs from 'fs';
//import globule from 'globule';

// Workbox plugin
//import {GenerateSW} from 'workbox-webpack-plugin';

// manifest.json
import WebpackPwaManifest from 'webpack-pwa-manifest';

const __dirname = path.resolve(path.dirname(''));
const isProd = process.env.NODE_ENV === 'production';
const outputPath = path.resolve(__dirname, "docs");

export default {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  context: process.cwd(),
  entry: {
    // Service worker entry point:
    sw: './src/sw.js',
    // Application entry point
    app: './src/index.js',
  },
  output: {
    path: outputPath,
    //publicPath: '/lp-ace/',
    filename: ({runtime}) => {
      // Check if the current filename is for the service worker:
      if (runtime === 'sw') {
        // Output a service worker in the root of the dist directory
        // Also, ensure the output file name doesn't have a hash in it
        return 'service-worker.js?';
      }

      // Otherwise, output files as normal
      return './asset/js/[name].[contenthash:8].js';
    },
    //Asset Modules の出力先の指定
    assetModuleFilename: 'images/[name].[contenthash:8][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s[ac]ss$/i, // 対象となるファイルの拡張子
        use: [
          // Creates `style` nodes from JS strings
          //"style-loader",
          {
            loader:  MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      //Asset Modules の設定
      {
        //対象とするアセットファイルの拡張子を正規表現で指定
        test: /\.(png|jpe?g|gif|svg|avif|webp)$/i,  
        //いずれかの type を指定
        type: 'asset/inline',
        generator: {
          filename: "./asset/images/[name].[contenthash:8][ext]"
        }
      },
      {
        //対象とするアセットファイルの拡張子を正規表現で指定
        test: /\.(eot|ttf|woff|woff2)$/i,  
        //いずれかの type を指定
        type: 'asset/resource',
        generator: {
          filename: "./asset/fonts/[name][ext]"
        }
      },
      {
        //対象とするアセットファイルの拡張子を正規表現で指定
        test: /\.ico$/i,  
        //いずれかの type を指定
        type: 'asset/resource',
        generator: {
          filename: "./asset/images/ico/[name].ico"
        }
      },
      {
        //対象とするアセットファイルの拡張子を正規表現で指定
        test: /icon/i,
        //いずれかの type を指定
        type: 'asset/resource',
        generator: {
          filename: "./asset/images/ico/[name][ext]"
        }
      },
      {
        //対象とするアセットファイルの拡張子を正規表現で指定
        //test: /^icon-/i,
        ////いずれかの type を指定
        //type: 'asset/resource',
        //generator: {
        //  filename: "./assets/images/ico/[name][ext]"
        //}
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    // new InjectManifest({
    //   swSrc: './src/sw.js'
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      //chunk: ['app'],
      excludeAssets: ["./src/sw.js", "./src/manifest.json"]
    }),
    new HtmlWebpackPlugin({
      template: './src/ikou/index.html',
      filename: 'ikou/index.html',
      inject: 'body',
      //chunk: ['app'],
      excludeAssets: ["./src/sw.js", "./src/manifest.json"]
    }),
    new HtmlWebpackPlugin({
      template: './src/kengaku/index.html',
      filename: 'kengaku/index.html',
      inject: 'body',
      //chunk: ['app'],
      excludeAssets: ["./src/sw.js", "./src/manifest.json"]
    }),
    new HtmlWebpackPlugin({
      template: './src/contact/index.html',
      filename: 'contact/index.html',
      inject: 'body',
      //chunk: ['app'],
      excludeAssets: ["./src/sw.js", "./src/manifest.json"]
    }),
    new HtmlWebpackSkipAssetsPlugin({
      excludeAssets: ["sw.js"]
    }),
    new HtmlWebpackSkipAssetsPlugin({
      excludeAssets: ["manifest.json"]
    }),
    new MiniCssExtractPlugin({
      filename: './asset/css/[name].[contenthash:8].css',
    }),
    new WebpackPwaManifest({
      publicPath: './',
      includeDirectory: true,
      theme_color: "#9bfbfd",
      background_color: "#9bfbfd",
      display: "standalone",
      scope: "https://heart-full.github.io/lp-ace/",
      start_url: "https://heart-full.github.io/lp-ace/",
      name: "Heartfull ACE",
      short_name: "ACE",
      description: "障がい者就労支援事業所ハートフルACE",
      crossorigin: 'use-credentials',
      ios: true,
      icons: [
          {
              src: path.resolve("src/asset/images/ico/icon-192x192.png"),
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
              destination: 'asset/images/icons',
          },
          {
              src: path.resolve("src/asset/images/ico/icon-256x256.png"),
              sizes: "256x256",
              type: "image/png",
              purpose: "any maskable",
              destination: 'asset/images/icons',
          },
          {
              src: path.resolve("src/asset/images/ico/icon-384x384.png"),
              sizes: "384x384",
              type: "image/png",
              purpose: "any maskable",
              destination: 'asset/images/icons',
          },
          {
              src: path.resolve("src/asset/images/ico/icon-512x512.png"),
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
              destination: 'asset/images/icons',
          }
      ],
    }),
  ],
};