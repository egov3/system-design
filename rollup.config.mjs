import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import * as dtsPackage from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import sass from "sass";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dts = dtsPackage.default || dtsPackage;

const extensionsToIgnore = [/\.(css|less|scss)$/];
const externalDeps = ["react", "react-dom", "tslib", /node_modules/];

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

const aliasEntries = alias({
  entries: [
    {
      find: "~baseComponents",
      replacement: `${__dirname}/src/baseComponents/index.ts`,
    },
    {
      find: "~components",
      replacement: `${__dirname}/src/components/index.ts`,
    },
    { find: "~constants", replacement: `${__dirname}/src/constants` },
    { find: "~interfaces", replacement: `${__dirname}/src/interfaces` },
    { find: "~svg", replacement: `${__dirname}/src/svg/index.ts` },
    { find: "~utils", replacement: `${__dirname}/src/utils` },
  ],
});

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
      aliasEntries,
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
    plugins: [
      aliasEntries,
      dts(),
    ],
    external: extensionsToIgnore,
  },
];
