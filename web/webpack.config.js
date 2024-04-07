import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { fileURLToPath } from "url"
import webpack from "webpack"

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url))

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"

/** @type {import('webpack').Configuration} */
export default {
  cache: {
    buildDependencies: {
      config: [resolve(".")],
    },
    type: "filesystem",
  },
  devServer: {
    port: 3000,
    static: {
      directory: resolve("./public/"),
      publicPath: "/",
    },
  },
  devtool: prod ? false : "source-map",
  entry: {
    main: ["./src/index.js"],
  },
  mode,
  module: {
    noParse: [
      // This is necessary because flow is trying to load the 'fs' module, but
      // dynamically. Without this webpack will throw an error at runtime.
      // I assume the `require(...)` call "succeeds" because 'fs' is shimmed to
      // be empty below.
      // https://github.com/fkling/astexplorer/blob/master/website/webpack.config.js#L228
      /flow-parser\/flow_parser\.js/,
    ],
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        loader: "babel-loader",
        options: { rootMode: "upward" },
        test: /\.tsx?$/,
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: resolve("./public/"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new webpack.EnvironmentPlugin({ NODE_DEBUG: false }),
  ],
  resolve: {
    alias: {
      svelte: resolve("../node_modules/svelte/"),
    },
    extensions: [".ts", ".mjs", ".js", ".svelte"],
    fallback: {
      os: false,
    },
  },
}
