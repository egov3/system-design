import { resolve as pathResolve } from "node:path";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";
import * as dtsPackage from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import * as sass from "sass";

const projectRoot = pathResolve(process.cwd());

const dts = dtsPackage.default || dtsPackage;

const extensionsToIgnore = [/\.(css|less|scss)$/];
const externalDeps = ["react", "react-dom", "tslib", /node_modules/];

const injectCSS = (cssVarName: string): string =>
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

const config: RollupOptions[] = [
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
        // biome-ignore lint/suspicious/noExplicitAny: PostCSS plugin types are complex
        use: [["sass", { implementation: sass }]] as any,
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
      alias({
        entries: [
          {
            find: "~baseComponents",
            replacement: pathResolve(
              projectRoot,
              "src/baseComponents/index.ts",
            ),
          },
          {
            find: "~components",
            replacement: pathResolve(projectRoot, "src/components/index.ts"),
          },
          {
            find: "~constants",
            replacement: pathResolve(projectRoot, "src/constants"),
          },
          {
            find: "~interfaces",
            replacement: pathResolve(projectRoot, "src/interfaces"),
          },
          {
            find: "~svg",
            replacement: pathResolve(projectRoot, "src/svg/index.ts"),
          },
          {
            find: "~utils",
            replacement: pathResolve(projectRoot, "src/utils"),
          },
        ],
      }),
      dts({
        respectExternal: false,
      }),
    ],
    external: extensionsToIgnore,
  },
];

export default config;
