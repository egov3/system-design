import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import * as dtsPackage from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import sass from "sass";

const dts = dtsPackage.default || dtsPackage;

const extensionsToIgnore = [/\.(css|less|scss)$/];
const externalDeps = ["react", "react-dom", "tslib", /node_modules/];

const injectCSS = (cssVarName) =>
  `function styleInject(css, options) {
    if (!css || typeof document === 'undefined') return;
    const head = document.head || document.getElementsByTagName('head')[0];
@@ -26,7 +31,7 @@ const injectCSS = (cssVarName) =>
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
        dedupe: ["style-inject", "react", "react-dom"],
      }),
      commonjs({
        exclude: [/node_modules\/react/, /node_modules\/react-dom/],
      }),
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
