import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import type { ISelectedPeriod, TPeriodKeys } from "~interfaces/Calendar";
import { isInvalidDateRange } from "~utils/date/range/isValidDateRange";
import { joinClasses } from "~utils/joinClasses";
import styles from "./CalendarHeader.module.css";

interface IHeaderProps {
  setSelectedPeriodInterval: (periodKey: TPeriodKeys) => void;
  selectedPeriodInterval: TPeriodKeys;
  selectedPeriod: ISelectedPeriod;
}

const parseDate = (value?: string) =>
  value
    ? (() => {
        const [day, month, year] = value.split(".").map(Number);
        return { day, month, year };
      })()
    : null;

export const CalendarHeader = ({
  setSelectedPeriodInterval,
  selectedPeriodInterval,
  selectedPeriod,
}: IHeaderProps) => {
  const from = parseDate(selectedPeriod.fromDate);
  const to = parseDate(selectedPeriod.toDate);
  const tabs: { key: TPeriodKeys; label: string }[] = [
    { key: PERIOD_KEYS.from, label: "Период с" },
    { key: PERIOD_KEYS.to, label: "Период до" },
  ];
  const hasRange = selectedPeriod.fromDate && selectedPeriod.toDate;
  const hasError = Boolean(
    hasRange && from && to && isInvalidDateRange({ from, to }),
  );
  return (
    <div data-testid="CalendarTab_WRAP" className={styles.tab}>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.key}
          data-testid={`CalendarTabButton_${tab.key.toUpperCase()}`}
          className={joinClasses(
            selectedPeriodInterval === tab.key
              ? styles.titleActiv
              : styles.title,
            hasError ? styles.titleError : undefined,
          )}
          onClick={() => {
            setSelectedPeriodInterval(tab.key);
          }}
          aria-label={`Кнопка ${tab.label}`}
        >
          <BaseComponents.Typography
            data-testid={`CalendarTabTitle_${tab.key.toUpperCase()}`}
            tag="span"
            fontClass="body1Medium"
            aria-label={tab.label}
          >
            {`${tab.label} ...*`}
          </BaseComponents.Typography>
        </button>
      ))}
    </div>
  );
};
