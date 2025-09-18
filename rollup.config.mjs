import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import sass from "sass";

import * as dtsPackage from "rollup-plugin-dts";
const dts = dtsPackage.default || dtsPackage;

const extensionsToIgnore = [/\.(css|less|scss)$/];
const externalDeps = [/node_modules/];

const injectCSS = (cssVarName) =>
  `function styleInject(css, options) {
    if (!css || typeof document === 'undefined') return;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    if (options && options.id) style.id = options.id;
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  }
  styleInject(${cssVarName});`;

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
      },
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      resolve({
        browser: true,
        dedupe: ["style-inject"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      postcss({
        use: [["sass", { implementation: sass }]],
        modules: true,
        extract: false,
        inject: injectCSS,
      }),
    ],
    external: externalDeps,
  },

  {
    input: "src/index.ts",
    output: {
      dir: "dist/types",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [dts()],
    external: extensionsToIgnore,
  },
];
