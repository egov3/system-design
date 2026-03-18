# Egov3/System-Design

![npm](https://img.shields.io/npm/v/@egov3/system-design) ![license](https://img.shields.io/npm/l/@egov3/system-design) ![downloads](https://img.shields.io/npm/dt/@egov3/system-design)

## О проекте

Egov3/System-Design — это библиотека UI-компонентов с поддержкой Storybook. Включает в себя готовые элементы интерфейса, утилиты для работы с датами и улучшенные стили.

## Requirements
- Node.js >= 18
- Yarn 1.x

## Установка

С Yarn:
```sh
yarn add @egov3/system-design
```

С npm:
```sh
npm install @egov3/system-design
```

## Использование

```tsx
import SystemDesign from '@egov3/system-design';

function App() {
  return (
    <SystemDesign.Components.Typography
      tag="span"
      fontClass="caption1Medium"
      data-testid="DocCard_TITLE"
      className={styles.title}
    >
      {title}
    </SystemDesign.Components.Typography>
  );
}
```

## Запуск Storybook

```sh
yarn sb
```

### Линтинг + Форматирование + Исправление

```bash
yarn lint:fix
```

### Поиск неиспользуемых CSS-стилей

```bash
yarn dead-css
```

---

# Release Notes

## 1.3.95

### 🆕 Новые компоненты:
- **SearchBar** — поле поиска с иконкой:
  - варианты оформления: `default`, `shadow`, `slim`;
  - дебаунс для `handleOnChange` (настраивается через `debounceDelay`, по умолчанию 300 мс);
  - `handleOnEnter` при нажатии Enter;
  
## 1.3.87

### 🆕 Новые компоненты:
- **InputFieldGroup** — группа текстовых полей (для OTP):
- длина (кол-во) полей `length`;
- `handleOnChange` при изменении значения;
- `handleKeyDown` при нажатии;

## 1.3.75

### 🆕 Новые компоненты:
- **Label**
- **WarningText**
- **TabButtons**

### 🚀 Улучшения:
- обновлен компонент **SelectBoxButton**

## 1.2.65
- Добавлен вариант `black` для `Button`
- Исправлена толщина иконки в `Accordion`

## 1.2.56
- добавлены глобалные стили

## 1.1.45
### 🚀 Улучшения:
- Переименован `combineClassNames` → `joinClasses`

## 1.0.43

### 🆕 Новые компоненты:
- **Calendar**
- **Modal**
- **SelectBoxButton**

### 🚀 Улучшения:
- Добавлены `global.scss` и `normalize.scss`
- Добавлен `colors.module.css`
- Добавлены утилиты `getDaysRange`, `getMonthRange`
- Переименован `CombineClassNames` → `combineClassNames`

### 🔧 Новые утилиты:

#### `getDaysRange(day, month, year)`
Возвращает массив из 5 дней, включая переданный день, два дня до и два после. **Примеры:**
```js
getDaysRange({ day: 15, month: 2, year: 2020 }); // [13, 14, 15, 16, 17]
getDaysRange({ day: 2, month: 2, year: 2020 });  // [1, 2, 3, 4]
getDaysRange({ day: 31, month: 2, year: 2020 }); // [29, 30, 31]
```

#### `getMonthRange(month, year)`
Возвращает массив из 5 месяцев (2 до, текущий, 2 после). Индексация месяцев: `[0...11]`. **Примеры:**
```js
getMonthRange(5, 2020);  // [3, 4, 5, 6, 7]
getMonthRange(0, 2020);  // [0, 1, 2]
getMonthRange(11, 2020); // [9, 10, 11]
```

#### `isValidDateRange(from, to)`
Проверяет, является ли диапазон дат корректным. **Примеры:**
```js
isValidDateRange({ from: { day: 25, month: 2, year: 2020 }, to: { day: 25, month: 2, year: 2023 } }); // true
isValidDateRange({ from: { day: 25, month: 6, year: 2023 }, to: { day: 25, month: 2, year: 2023 } }); // false
```

#### `isInvalidDateRange(from, to)`
Обратная функция `isValidDateRange`.

#### `convertType`
Функции для преобразования типов данных даты. **Примеры:**
```js
convertType.day.toString(2);  // "02"
convertType.day.toNumber("02"); // 2
convertType.month.toString(2);  // "03"
convertType.month.toNumber("02"); // 1
convertType.year.toString(2020);  // "2020"
convertType.year.toNumber("2020"); // 2020
convertType.date.toNumber({ day: "25", month: "02", year: "2019" }); // { "day": 25, "month": 1, "year": 2019 } 
convertType.date.toString({ "day": 25, "month": 1, "year": 2019 }); // { "day": "25", "month": "02", "year": "2019" }
convertType.dateRange.toString({ from: { "day": 25, "month": 1, "year": 2019 }, to: { "day": 25, "month": 1, "year": 2019 } }) // { "from": { "day": "25", "month": "02", "year": "2019" }, "to": { "day": "25", "month": "02", "year": "2019" }} 
convertType.dateRange.toNumber({ from: { day: "25", month: "02", year: "2019" }, to: { day: "25", month: "02", year: "2019" } }) // { "from": { "day": 25, "month": 1, "year": 2019 }, "to": { "day": 25, "month": 1, "year": 2019 }}
```

#### `formatDate(date)`
Форматирует дату **Примеры:**
```js
formatDate(new Date()) // "2025-03-01" 
```

#### `getDaysInMonth(month, year)`
Возвращает количество дней в месяце **Примеры:**
```js
getDaysInMonth(1, 2020) // 29
```

#### `getMonthNameProper(month, year)`
Возвращает название месяца по индексу[0..11] **Примеры:**
```js
getMonthNameProper(1) // "Февраль"
```

#### `getValideMonthAndDay({ day, month, year })`
Возвращает исправленную дату, которая не больше текущей даты **Примеры:**
```js
getValideMonthAndDay({ day: 30, month: 1, year: 2020 }) // { "day": 29, "month": 1, "year": 2020 } 
getValideMonthAndDay({ day: 30, month: 11, year: 2020 }) // { "day": 1, "month": 2, "year": 2025 } 
```

#### `isValidateDate({ day, month, year})`
Проверяет дату меньше текущего дня **Примеры:**
```js
isValidateDate({ day: 25, month: 1, year: 2026}) // false
isValidateDate({ day: 25, month: 1, year: 2024}) // екгу
```

#### `isInvalidateDate({ day, month, year})`
Обратная функция от `isValidateDate`.

#### `isValidateDate({ day, month, year})`
Проверяет дату меньше текущего дня **Примеры:**
```js
normalizeDayAndMonth({ day: 30, month: 1, year: 2024}) // 29
```

#### `toPascalCase(word)`
Делает строчным буквы кроме первой **Примеры:**
```js
toPascalCase("hello") // "Hello" 
toPascalCase("HELLO") // "Hello" 
```

#### `GenerateArray(length, start)`
Создает массив **Примеры:**
```js
GenerateArray(2, 5) // [5, 6] 
GenerateArray(2) // [1, 2] 
```

### 1.0.42
- Добавлены компоненты **Modal**, **SelectBoxButton**, **Calendar**

### 1.0.41
- Исправлено название `Components` в латиницу

### 1.0.40
- **Typography** теперь поддерживает `jsx`-стили
- Обновлён Storybook и его зависимости
- Удалён `addon-mdx-gfm`
- Добавлены утилиты `CreateArray`, `SetCharAt`
- Добавлен `InputGroup` (группа `InputField`)
- Расширен `InputField` через стандартный интерфейс React

---

# 📬 Контакты

Если у вас есть вопросы или предложения, создавайте [Issue](https://github.com/egov3/system-design/issues) в репозитории или пишите в командный чат проекта.

test
