// rollup.config.js
import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy'

export default {
  input: "src/index.js",
  output: [
    { file: "dist/bundle.js", format: "cjs", plugins: [terser()]},
  ],
  plugins: [
    copy({
      targets: [
        { src: 'public/playlist.json', dest: 'dist/public' }
      ]
    })
  ]
};