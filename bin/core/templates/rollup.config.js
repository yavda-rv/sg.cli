import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser'
import { name, main } from './package.json'

export default {
    input: '.temp/src/EntryPoint.js',
    output: {
        file: main,
        sourcemap: true,
        name: name,
        format: "umd",
        globals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "sg.shell": "sg"
        }
    },
    external: ["react", "react-dom", "sg.shell"],
    plugins: [
        json(),
        resolve(),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        })        
    ],
    watch: {
        clearScreen: false
    }
};