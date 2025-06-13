import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

function browser(name) {
  return {
    input: "src/index.ts",
    external: ["xmldom"],
    output: [
      {
        name: "ia",
        file: name,
        format: "umd",
        plugins: [
          getBabelOutputPlugin({
            presets: [["@babel/env", { modules: "umd" }]],
            allowAllFormats: true,
          }),
        ],
      },
    ],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        plugins: ["babel-plugin-async-to-promises"],
      }),
    ],
  };
}

function modern(name) {
  return {
    input: "src/index.ts",
    external: ["xmldom"],
    output: [
      {
        name: "ia",
        file: name,
        format: "umd",
        plugins: [
          getBabelOutputPlugin({
            presets: [
              [
                "@babel/env",
                {
                  modules: "umd",
                  targets: [
                    "last 2 Chrome versions",
                    "last 2 iOS major versions",
                  ],
                },
              ],
            ],
            allowAllFormats: true,
          }),
        ],
      },
    ],
    plugins: [typescript(), resolve(), commonjs()],
  };
}

export default [
  browser(pkg.browser),
  browser("examples/web/ia.browser.js"),
  modern("dist/ia.modern.js"),
  {
    input: "src/index.ts",
    external: [],
    output: [
      { file: pkg.cjs, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript(), commonjs()],
  },
];
