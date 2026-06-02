import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import type { ISelectedPeriod, TPeriodKeys } from "~interfaces/Calendar";
import { joinClasses } from "~utils/joinClasses";
import styles from "./CalendarHeader.module.css";

interface IHeaderProps {
  setSelectedPeriodInterval: (periodKey: TPeriodKeys) => void;
  selectedPeriodInterval: TPeriodKeys;
  selectedPeriod: ISelectedPeriod;
}

export const CalendarHeader = ({
  setSelectedPeriodInterval,
  selectedPeriodInterval,
  selectedPeriod,
}: IHeaderProps) => {
  const tabs: { key: TPeriodKeys; label: string }[] = [
    { key: PERIOD_KEYS.from, label: "Период с" },
    { key: PERIOD_KEYS.to, label: "Период до" },
  ];
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
            {`${tab.label} ${selectedPeriod[`${tab.key}Date`] || "...*"}`}
          </BaseComponents.Typography>
        </button>
      ))}
    </div>
  );
};
