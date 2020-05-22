import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import livereload from "rollup-plugin-livereload"
import postcss from "rollup-plugin-postcss"
import serve from "rollup-plugin-serve"
import svelte from "rollup-plugin-svelte"

module.exports = {
  input: "web/index.js",
  output: {
    dir: "web/public",
    format: "esm",
    name: "app",
  },
  plugins: [
    svelte({ emitCss: true }),
    commonjs(),
    resolve(),
    postcss({ extract: true, minimize: true }),
    serve("web"),
    livereload(),
  ],
  watch: { clearScreen: false },
}
