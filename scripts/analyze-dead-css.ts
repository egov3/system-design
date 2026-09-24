#!/usr/bin/env ts-node

import { glob } from "glob";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PurgeCSS } from "purgecss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Получаем все CSS файлы
const cssFiles: string[] = await glob("src/**/*.css", {
  cwd: projectRoot,
  absolute: true,
});

// Файлы для сканирования контента
const contentPatterns: string[] = [
  "src/**/*.{ts,tsx,js,jsx}",
  "app/**/*.{ts,tsx,js,jsx}",
  "!src/**/*.test.{ts,tsx}",
  "!**/node_modules/**",
  "!**/.next/**",
  "!**/coverage/**",
  "!**/__tests__/**",
];

console.log("🔍 Начинаю анализ неиспользуемых CSS стилей...\n");
console.log(`📁 Найдено CSS файлов: ${cssFiles.length}\n`);

function cleanCSS(cssContent: string): string {
  let cleaned = cssContent.replaceAll(/\/\*[\s\S]*?\*\//g, "");
  cleaned = cleaned.replaceAll(/url\([^)]*\)/gi, "url()");
  cleaned = cleaned.replaceAll(/:[^;{}]*;/g, ": ;");
  cleaned = cleaned.replaceAll(/:[^;{}]*}/g, ": }");
  return cleaned;
}

function extractClassesFromCSS(cssContent: string): string[] {
  const classes = new Set<string>();
  const cleanedCSS = cleanCSS(cssContent);

  const classRegex = /\.([a-z][a-z0-9_-]+)/gi;
  let match: RegExpExecArray | null = classRegex.exec(cleanedCSS);
  while (match !== null) {
    const className = match[1];
    if (
      className.length >= 2 &&
      ![
        "ttf",
        "svg",
        "png",
        "jpg",
        "jpeg",
        "webp",
        "gif",
        "ico",
        "woff",
        "woff2",
        "eot",
      ].includes(className.toLowerCase()) &&
      !["w3", "org", "http", "https", "www", "com", "net", "ru", "kz"].includes(
        className.toLowerCase(),
      )
    ) {
      classes.add(className);
    }
    match = classRegex.exec(cleanedCSS);
  }

  const idRegex = /#([a-z][a-z0-9_-]+)/gi;
  match = idRegex.exec(cleanedCSS);
  while (match !== null) {
    const idName = match[1];
    if (
      !["grayscale", "blur", "drop-shadow"].includes(idName.toLowerCase()) &&
      idName.length >= 2
    ) {
      classes.add(idName);
    }
    match = idRegex.exec(cleanedCSS);
  }

  return Array.from(classes);
}

function extractUsedClasses(content: string): Set<string> {
  const used = new Set<string>();
  if (!content) return used;

  // 1. Прямые строки
  const directMatches = content.matchAll(
    /className\s*=\s*["'`]([^"'`]+)["'`]/g,
  );
  for (const match of directMatches) {
    match[1].split(/\s+/).forEach((cls) => {
      if (cls) {
        used.add(cls);
      }
    });
  }

  // 2. В template literals
  const templateMatches = content.matchAll(/className\s*=\s*\{([^}]+)\}/g);
  for (const match of templateMatches) {
    const template = match[1];
    const strings = template.match(/["'`]([^"'`]+)["'`]/g);
    if (strings) {
      strings.forEach((s) => {
        const cls = s.replaceAll(/["'`]/g, "").trim();
        if (cls) {
          used.add(cls);
        }
      });
    }
  }

  // 3. CSS модули
  const moduleMatches = content.matchAll(/styles\.(\w+)/g);

  for (const match of moduleMatches) used.add(match[1]);

  return used;
}

// Читаем контент файлы
console.log("📖 Читаю контент файлы...\n");
const allContent: string[] = [];
const contentFilePaths: string[] = [];

for (const pattern of contentPatterns) {
  const files = await glob(pattern, {
    cwd: projectRoot,
    absolute: true,
    ignore: ["**/node_modules/**", "**/.next/**", "**/coverage/**"],
  });
  contentFilePaths.push(...files);
}

for (const filePath of contentFilePaths) {
  try {
    allContent.push(readFileSync(filePath, "utf-8"));
  } catch {
    console.warn(`⚠️  Не удалось прочитать файл: ${filePath}`);
  }
}

const allContentText = allContent.join("\n") || "";
const usedClasses = extractUsedClasses(allContentText) ?? new Set();
console.log(`🎯 Найдено используемых классов: ${usedClasses.size}\n`);
console.log(`📄 Прочитано контент файлов: ${contentFilePaths.length}`);
console.log(`🎯 Найдено используемых классов: ${usedClasses.size}\n`);

// Анализ CSS
interface DeadCssItem {
  file: string;
  totalClasses: number;
  deadClasses: number;
  classes: string[];
}
const deadCssReport: DeadCssItem[] = [];
const moduleClassesInGlobals: {
  file: string;
  className: string;
  baseClassName: string;
}[] = [];
let totalDeadClasses = 0;
let totalClasses = 0;

function getFilesThatImportCssModule(
  cssFilePath: string,
  contentFilePaths: string[],
): string[] {
  const parts = cssFilePath.split(/[\\/]/);
  const fileName = parts.pop();
  if (!fileName) {
    throw new Error(`Не удалось извлечь имя файла из пути: ${cssFilePath}`);
  }

  return contentFilePaths.filter((filePath) => {
    try {
      const content = readFileSync(filePath, "utf-8");
      const importRegex = new RegExp(
        String.raw`import\s+.*?from\s+['"].*${fileName}['"]`,
        "g",
      );
      return importRegex.test(content);
    } catch {
      return false;
    }
  });
}

// … дальше весь код с фильтрацией deadClasses и PurgeCSS
for (const cssFile of cssFiles) {
  const cssContent = readFileSync(cssFile, "utf-8");
  const definedClasses = extractClassesFromCSS(cssContent);
  totalClasses += definedClasses.length;

  // Для CSS модулей нужно учитывать, что классы могут быть с хешем
  // Но мы ищем по базовому имени класса
  const deadClasses = definedClasses.filter((className) => {
    // Для классов CSS модулей (с двойным подчеркиванием) извлекаем базовое имя
    // Например: ContentWrapper_serviceContainerWrapper__zsKd8 -> serviceContainerWrapper
    let baseClassName = className;
    if (className.includes("__")) {
      const parts = className.split("__");
      if (parts.length >= 2) {
        // Берем часть перед последним __
        const beforeHash = parts.slice(0, -1).join("__");
        // Извлекаем базовое имя класса (после последнего подчеркивания перед __)
        const nameParts = beforeHash.split("_");
        if (nameParts.length > 1) {
          baseClassName = nameParts[nameParts.length - 1];
        }
      }
    }

    // Проверяем, используется ли класс
    // Для CSS модулей ищем styles.className или styles.baseClassName
    // Также проверяем динамические обращения через styles[`...`] или styles["..."]

    let relevantContent = allContentText;

    if (cssFile.endsWith(".module.css")) {
      const importerFiles = getFilesThatImportCssModule(
        cssFile,
        contentFilePaths,
      );

      const importerContent = importerFiles
        .map((file) => readFileSync(file, "utf-8"))
        .join("\n");

      relevantContent = importerContent;
    }

    const localUsedClasses = extractUsedClasses(relevantContent);

    const isUsed =
      localUsedClasses.has(className) || localUsedClasses.has(baseClassName);

    // Также проверяем, может ли это быть глобальный класс
    const isGlobalClass =
      cssFile.includes("globals.css") ||
      cssFile.includes("normalize.css") ||
      cssFile.includes("colors.css") ||
      cssFile.includes("typography.css");

    // Для классов CSS модулей в globals.css - это ошибка, они не должны там быть
    // Если класс содержит двойное подчеркивание в globals.css, это вероятно ошибочно добавленный класс модуля
    if (isGlobalClass && className.includes("__")) {
      // Сохраняем информацию о классе модуля в глобальных стилях
      moduleClassesInGlobals.push({
        file: cssFile.replace(`${projectRoot}/`, ""),
        className,
        baseClassName,
      });
      // Проверяем, используется ли базовое имя через styles
      const moduleNameUsed = allContentText.includes(`styles.${baseClassName}`);
      // Если не используется как модуль, считаем его неиспользуемым
      return !isUsed && !moduleNameUsed;
    }

    // Для глобальных классов проверяем использование в HTML/JSX
    if (isGlobalClass) {
      return !isUsed && !allContentText.includes(className);
    }

    return !isUsed;
  });

  totalDeadClasses += deadClasses.length;

  if (deadClasses.length > 0) {
    deadCssReport.push({
      file: cssFile.replace(`${projectRoot}/`, ""),
      totalClasses: definedClasses.length,
      deadClasses: deadClasses.length,
      classes: deadClasses,
    });
  }
}

// Используем PurgeCSS для более точного анализа
console.log("🔧 Запускаю PurgeCSS для детального анализа...\n");

const purgeCSSResult = await new PurgeCSS().purge({
  content: contentFilePaths,
  css: cssFiles,
  safelist: {
    standard: [/^html$/, /^body$/, /^root$/, /^:root$/],
    deep: [/^[a-z][a-z0-9_-]*__[a-z0-9_-]+$/],
  },
  defaultExtractor: (content: string) => {
    const broadMatches: string[] = Array.from(
      content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    );
    const innerMatches: string[] = Array.from(
      content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [],
    );

    return broadMatches.concat(innerMatches);
  },
});

// Создаем детальный отчет
let purgeTotalRemoved = 0;
let purgeTotalOriginal = 0;

for (let i = 0; i < cssFiles.length; i++) {
  const originalContent = readFileSync(cssFiles[i], "utf-8");
  const purgedContent = purgeCSSResult[i].css;

  const originalSize = originalContent.length;
  const purgedSize = purgedContent.length;
  const removedSize = originalSize - purgedSize;

  purgeTotalOriginal += originalSize;
  purgeTotalRemoved += removedSize;
}

// Выводим отчет в консоль
console.log(`\n${"=".repeat(80)}`);
console.log("📊 ОТЧЕТ О НЕИСПОЛЬЗУЕМЫХ CSS СТИЛЯХ");
console.log("=".repeat(80));
console.log(`Дата анализа: ${new Date().toLocaleString("ru-RU")}\n`);

console.log("📈 ОБЩАЯ СТАТИСТИКА");
console.log("-".repeat(80));
console.log(`   Всего CSS файлов: ${cssFiles.length}`);
console.log(`   Всего определенных классов: ${totalClasses}`);
console.log(`   Неиспользуемых классов: ${totalDeadClasses}`);
console.log(
  `   Процент неиспользуемых: ${totalClasses > 0 ? ((totalDeadClasses / totalClasses) * 100).toFixed(2) : 0}%\n`,
);

console.log("🔧 АНАЛИЗ PURGECSS");
console.log("-".repeat(80));
console.log(
  `   Общий размер CSS: ${(purgeTotalOriginal / 1024).toFixed(2)} KB`,
);
console.log(`   Можно удалить: ${(purgeTotalRemoved / 1024).toFixed(2)} KB`);
console.log(
  `   Процент удаления: ${purgeTotalOriginal > 0 ? ((purgeTotalRemoved / purgeTotalOriginal) * 100).toFixed(2) : 0}%\n`,
);

if (deadCssReport.length > 0) {
  console.log("🗑️  НЕИСПОЛЬЗУЕМЫЕ КЛАССЫ ПО ФАЙЛАМ");
  console.log("-".repeat(80));
  deadCssReport.forEach((item) => {
    console.log(`\n   📄 ${item.file}`);
    console.log(`   Всего классов: ${item.totalClasses}`);
    console.log(`   Неиспользуемых: ${item.deadClasses}`);
    if (item.classes.length > 0) {
      console.log(`   Список неиспользуемых классов:`);
      item.classes.forEach((cls) => {
        console.log(`      - .${cls}`);
      });
    }
  });
  console.log("\n");
}

if (moduleClassesInGlobals.length > 0) {
  console.log("⚠️  КЛАССЫ CSS МОДУЛЕЙ В ГЛОБАЛЬНЫХ СТИЛЯХ");
  console.log("-".repeat(80));
  console.log(
    "   Обнаружены классы CSS модулей в глобальных стилях.\n   Эти классы должны быть только в CSS модулях, а не в globals.css!\n",
  );
  moduleClassesInGlobals.forEach((item) => {
    console.log(`   📄 ${item.file}`);
    console.log(`      Класс: .${item.className}`);
    console.log(`      Базовое имя: ${item.baseClassName}`);
    console.log(
      `      Рекомендация: Удалите этот класс из глобальных стилей.\n`,
    );
  });
}

console.log("✅ Анализ завершен!\n");
