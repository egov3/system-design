import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Входная точка
  format: ["cjs", "esm"], // Поддерживаемые форматы
  dts: true, // Генерация .d.ts файлов
  splitting: false, // Отключаем код-сплиттинг
  sourcemap: true, // Включаем sourcemap
  clean: true, // Очищаем dist перед сборкой
  minify: true, // Минификация
  external: ["react", "react-dom"], // Указываем peerDependencies как external
});