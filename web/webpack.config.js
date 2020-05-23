// import commonjs from "@rollup/plugin-commonjs"
// import resolve from "@rollup/plugin-node-resolve"
// import livereload from "rollup-plugin-livereload"
// import postcss from "rollup-plugin-postcss"
// import serve from "rollup-plugin-serve"
// import svelte from "rollup-plugin-svelte"

// module.exports = {
//   input: "web/index.js",
//   output: {
//     dir: "web/public",
//     format: "esm",
//     name: "app",
//   },
//   plugins: [
//     svelte({ emitCss: true }),
//     commonjs(),
//     resolve(),
//     postcss({ extract: true, minimize: true }),
//     serve("web"),
//     livereload(),
//   ],
//   watch: { clearScreen: false },
// }

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "public"),
    open: true,
  },
  devtool: prod ? false : "source-map",
  entry: {
    main: ["./src/index.js"],
  },
  mode,
  module: {
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
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "public"),
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].[hash].css" })],
  resolve: {
    alias: {
      svelte: path.resolve("..", "node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
  },
}
