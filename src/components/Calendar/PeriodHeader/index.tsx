import type { Dispatch, SetStateAction } from "react";
import { BaseComponents } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import type { IPeriodTab, TPeriodKeys } from "~interfaces/Calendar";
import { joinClasses } from "~utils/joinClasses";
import styles from "./PeriodHeader.module.css";

interface IPeriodHeaderProps {
  setSelectedPeriod: Dispatch<SetStateAction<TPeriodKeys>>;
  selectedPeriod: TPeriodKeys;
  hasInvalidDateRange: boolean;
}

export const PeriodHeader = ({
  setSelectedPeriod,
  selectedPeriod,
  hasInvalidDateRange,
}: IPeriodHeaderProps) => {
  const tabs: IPeriodTab[] = [
    {
      key: PERIOD_KEYS.from,
      label: "Период с",
    },
    {
      key: PERIOD_KEYS.to,
      label: "Период до",
    },
  ];
  return (
    <div data-testid="PeriodHeader_WRAP" className={styles.tab}>
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.key}
          data-testid={`PeriodHeader_BUTTON_${tab.key.toUpperCase()}`}
          className={joinClasses(
            selectedPeriod === tab.key ? styles.titleActiv : styles.title,
            hasInvalidDateRange ? styles.titleError : undefined,
          )}
          onClick={() => {
            setSelectedPeriod(tab.key);
          }}
          aria-label={`Кнопка ${tab.label}`}
        >
          <BaseComponents.Typography
            data-testid={`PeriodHeader_TITLE_${tab.key.toUpperCase()}`}
            tag="span"
            fontClass="body1Medium"
            aria-label="Период с"
          >
            {tab.label} ...*
          </BaseComponents.Typography>
        </button>
      ))}
    </div>
  );
};
