import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import sass from "sass";

import * as dtsPackage from "rollup-plugin-dts";
const dts = dtsPackage.default || dtsPackage;

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
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationDir: null,
        outDir: null,
      }),
      postcss({
        use: [
          [
            "sass",
            {
              implementation: sass,
            },
          ],
        ],
      }),
    ],
    external: [
      /node_modules/,
      "react",
      "react-dom",
      "@egov3/graphics",
    ], 
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
      },
    ],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
