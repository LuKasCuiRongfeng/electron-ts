import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescrit from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

export default defineConfig({
    input: "src/main/main.ts",
    output: {
        file: "dist/main/main.js",
        format: "cjs"
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        typescrit()
    ],
    external: ["electron"]
})