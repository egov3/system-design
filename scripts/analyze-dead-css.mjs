#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import { PurgeCSS } from "purgecss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Получаем все CSS файлы
const cssFiles = await glob("src/**/*.css", {
  cwd: projectRoot,
  absolute: true,
});

// Файлы для сканирования контента
const contentPatterns = [
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

// Функция для очистки CSS от комментариев и url()
function cleanCSS(cssContent) {
  // Удаляем комментарии
  let cleaned = cssContent.replace(/\/\*[\s\S]*?\*\//g, "");

  // Удаляем содержимое url() чтобы не парсить расширения файлов и другие данные
  cleaned = cleaned.replace(/url\([^)]*\)/gi, "url()");

  // Удаляем значения CSS свойств (всё после : до ;), чтобы не парсить HEX-коды и другие значения
  // Это оставит только селекторы и свойства без значений
  cleaned = cleaned.replace(/:[^;{}]*;/g, ": ;");
  cleaned = cleaned.replace(/:[^;{}]*}/g, ": }");

  return cleaned;
}

// Функция для извлечения классов из CSS файла
function extractClassesFromCSS(cssContent) {
  const classes = new Set();

  // Очищаем CSS от комментариев и url()
  const cleanedCSS = cleanCSS(cssContent);

  // Извлекаем классы из селекторов (только настоящие классы, не в комментариях)
  // Игнорируем классы в url(), в комментариях и очень короткие классы (< 2 символов)
  const classRegex = /\.([a-z][a-z0-9_-]{1,})/gi;
  let match = classRegex.exec(cleanedCSS);
  while (match !== null) {
    const className = match[1];
    // Фильтруем ложные срабатывания:
    // - очень короткие имена (< 2 символов после точки)
    // - расширения файлов (ttf, svg, png, jpg, jpeg, webp, etc.)
    // - части URL (w3, org, http, https, etc.)
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

  // Извлекаем ID селекторы (только если это не часть фильтра SVG)
  const idRegex = /#([a-z][a-z0-9_-]{1,})/gi;
  match = idRegex.exec(cleanedCSS);
  while (match !== null) {
    const idName = match[1];
    // Игнорируем ID фильтров SVG (grayscale, blur, etc.)
    if (
      idName.length >= 2 &&
      !["grayscale", "blur", "drop-shadow"].includes(idName.toLowerCase())
    ) {
      classes.add(idName);
    }
    match = idRegex.exec(cleanedCSS);
  }

  return Array.from(classes);
}

// Функция для извлечения используемых классов из контента
function extractUsedClasses(content) {
  const used = new Set();

  // CSS модули: styles.className
  const moduleMatches = content.matchAll(/styles\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
  for (const match of moduleMatches) {
    used.add(match[1]);
  }

  // Динамические обращения к стилям через квадратные скобки
  // styles[`${variable}Variant`] или styles[variable + "Variant"] или styles["largeVariant"]
  // Используем более точное регулярное выражение для шаблонных строк
  const dynamicStyleMatches = content.matchAll(
    /styles\[`\$\{[^}]+\}Variant`\]|styles\[`[^`]+`\]|styles\["[^"]+"\]|styles\['[^']+'\]/g,
  );
  for (const match of dynamicStyleMatches) {
    const dynamicExpr = match[0];
    // Извлекаем возможные имена классов из шаблонных строк
    // Ищем паттерны типа ${...}Variant или "largeVariant" или 'smallVariant'
    const templateVariantMatches = dynamicExpr.matchAll(
      /[`'"]([a-zA-Z_][a-zA-Z0-9_]*)[`'"]/g,
    );
    for (const variantMatch of templateVariantMatches) {
      used.add(variantMatch[1]);
    }
    // Если видим паттерн ${variable}Variant, добавляем возможные варианты
    // Проверяем различные паттерны динамических обращений
    if (/\$\{[^}]+\}Variant/.test(dynamicExpr)) {
      // Добавляем все классы, которые могут быть сгенерированы динамически
      // В данном случае ищем все возможные варианты, заканчивающиеся на Variant
      // Это нужно для случаев, когда используется шаблонная строка с переменной
      used.add("largeVariant");
      used.add("smallVariant");
      used.add("mediumVariant");
    }
    // Также проверяем прямые строковые литералы в квадратных скобках
    if (/styles\[["']([a-zA-Z_][a-zA-Z0-9_]*)["']\]/.test(dynamicExpr)) {
      const directMatch = dynamicExpr.match(
        /styles\[["']([a-zA-Z_][a-zA-Z0-9_]*)["']\]/,
      );
      if (directMatch[1]) {
        used.add(directMatch[1]);
      }
    }
  }

  // Обычные className
  const classNameMatches = content.matchAll(
    /className[=:]\s*["'`]([^"'`]+)["'`]/g,
  );
  for (const match of classNameMatches) {
    match[1].split(/\s+/).forEach((cls) => {
      if (cls.trim()) used.add(cls.trim());
    });
  }

  // Template literals в className
  const templateMatches = content.matchAll(/className\s*=\s*\{[^}]*\}/g);
  for (const match of templateMatches) {
    const templateContent = match[0];
    // Извлекаем строки из template
    const stringMatches = templateContent.matchAll(/["'`]([^"'`]+)["'`]/g);
    for (const strMatch of stringMatches) {
      strMatch[1].split(/\s+/).forEach((cls) => {
        if (cls.trim()) used.add(cls.trim());
      });
    }
  }

  // Классы в глобальных стилях (например, в globals.css)
  // const globalClassMatches = content.matchAll(/\b([a-z][a-z0-9_-]*)\b/gi);
  // for (const match of globalClassMatches) {
  //   // Фильтруем только потенциальные классы
  //   const potentialClass = match[1];
  //   if (potentialClass.length > 2 && /^[a-z]/.test(potentialClass)) {
  //     used.add(potentialClass);
  //   }
  // }

  return used;
}

// Читаем все контент файлы
console.log("📖 Читаю контент файлы...\n");
const allContent = [];
const contentFilePaths = [];

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
    const content = readFileSync(filePath, "utf-8");
    allContent.push(content);
  } catch (_error) {
    console.warn(`⚠️  Не удалось прочитать файл: ${filePath}`);
  }
}

const allContentText = allContent.join("\n");
const usedClasses = extractUsedClasses(allContentText);

console.log(`📄 Прочитано контент файлов: ${contentFilePaths.length}`);
console.log(`🎯 Найдено используемых классов: ${usedClasses.size}\n`);

// Анализируем каждый CSS файл
const deadCssReport = [];
const moduleClassesInGlobals = [];
let totalDeadClasses = 0;
let totalClasses = 0;

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
    const isUsed =
      usedClasses.has(className) ||
      usedClasses.has(baseClassName) ||
      allContentText.includes(`styles.${className}`) ||
      allContentText.includes(`styles.${baseClassName}`) ||
      (allContentText.includes(`styles[\`\${`) &&
        allContentText.includes(`${className}\`]`)) ||
      allContentText.includes(`styles["${className}"]`) ||
      allContentText.includes(`styles['${className}']`) ||
      allContentText.includes(`styles[\`${className}\`]`) ||
      allContentText.includes(`.${className}`) ||
      allContentText.includes(`"${className}"`) ||
      allContentText.includes(`'${className}'`) ||
      allContentText.includes(`\`${className}\``);

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
    // Сохраняем базовые HTML элементы
    standard: [/^html$/, /^body$/, /^root$/, /^:root$/],
    // Сохраняем классы CSS модулей (с двойным подчеркиванием)
    deep: [/^[a-z][a-z0-9_-]*__[a-z0-9_-]+$/],
  },
  defaultExtractor: (content) => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

    return broadMatches.concat(innerMatches);
  },
});

// Создаем детальный отчет
const detailedReport = [];
let purgeTotalRemoved = 0;
let purgeTotalOriginal = 0;

for (let i = 0; i < cssFiles.length; i++) {
  const originalContent = readFileSync(cssFiles[i], "utf-8");
  const purgedContent = purgeCSSResult[i].css;

  const originalSize = originalContent.length;
  const purgedSize = purgedContent.length;
  const removedSize = originalSize - purgedSize;
  const removedPercent = ((removedSize / originalSize) * 100).toFixed(2);

  purgeTotalOriginal += originalSize;
  purgeTotalRemoved += removedSize;

  if (removedSize > 0) {
    detailedReport.push({
      file: cssFiles[i].replace(`${projectRoot}/`, ""),
      originalSize,
      purgedSize,
      removedSize,
      removedPercent: `${removedPercent}%`,
    });
  }
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
