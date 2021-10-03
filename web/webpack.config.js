const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { EnvironmentPlugin } = require("webpack")

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"
const publicPath = "/ratchet"

/** @type {import('webpack').Configuration} */
module.exports = {
  cache: {
    buildDependencies: {
      config: [__filename],
    },
    type: "filesystem",
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
      publicPath,
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
    path: path.join(__dirname, "public"),
    publicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.handlebars" }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new EnvironmentPlugin({ NODE_DEBUG: false }),
  ],
  resolve: {
    alias: {
      svelte: path.resolve("..", "node_modules", "svelte"),
    },
    extensions: [".ts", ".mjs", ".js", ".svelte"],
    fallback: {
      os: false,
    },
  },
}
