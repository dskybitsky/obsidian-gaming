import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styles';

const isProd = (process.env.BUILD === 'production');
const outDir = process.env.OUT_DIR ?? 'build';

const banner =
    `/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: 'inline',
        sourcemapExcludeSources: isProd,
        format: 'cjs',
        exports: 'named',
        file: `${outDir}/main.js`,
        assetFileNames: "[name][extname]",
        banner,
    },
    external: ['obsidian',
        "codemirror",
        "@codemirror/autocomplete",
        "@codemirror/closebrackets",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/comment",
        "@codemirror/fold",
        "@codemirror/gutter",
        "@codemirror/highlight",
        "@codemirror/history",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/matchbrackets",
        "@codemirror/panel",
        "@codemirror/rangeset",
        "@codemirror/rectangular-selection",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/stream-parser",
        "@codemirror/text",
        "@codemirror/tooltip",
        "@codemirror/view",
        "@lezer/common",
        "@lezer/lr"
    ],
    plugins: [
        typescript(),
        nodeResolve({browser: true}),
        commonjs(),
        nodePolyfills(),
        styles({
            mode: ["extract", "styles.css"],
        }),
        copy({
            targets: [
                {
                    src: [
                        './manifest.json'
                    ],
                    dest: outDir
                }
            ]
        }),
    ]
};
