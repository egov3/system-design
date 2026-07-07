// Copies public style assets into dist for package exports.
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(
  fileURLToPath(new URL("../package.json", import.meta.url)),
);
const srcDir = resolve(rootDir, "src/styles");
const distDir = resolve(rootDir, "dist/styles");

await mkdir(distDir, { recursive: true });

const styles = ["colors", "global", "normalize"];
const styleImports = styles
  .map((name) => `@import "./${name}.css";`)
  .join("\n");

for (const name of styles) {
  await copyFile(
    resolve(srcDir, `${name}.css`),
    resolve(distDir, `${name}.css`),
  );
}

await writeFile(resolve(distDir, "index.css"), `${styleImports}\n`);
