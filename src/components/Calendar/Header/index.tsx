import { Typography } from "~baseComponents";
import { PERIOD_KEYS } from "~constants/calendar";
import { i18n } from "~constants/i18n";
import type { ISelectedPeriod, TPeriodKeys } from "~interfaces/Calendar";
import type { ILangProps } from "~interfaces/common";
import { formatCalendarDate, getPeriodDateKey } from "~utils/calendar";
import styles from "./CalendarHeader.module.css";

interface IHeaderProps extends ILangProps {
  setSelectedPeriodInterval: (periodKey: TPeriodKeys) => void;
  selectedPeriodInterval: TPeriodKeys;
  selectedPeriod: ISelectedPeriod;
}

export const CalendarHeader = ({
  lang,
  setSelectedPeriodInterval,
  selectedPeriodInterval,
  selectedPeriod,
}: IHeaderProps) => {
  const langDic = i18n.Calendar;

  const tabs: { key: TPeriodKeys; label: string }[] = [
    { key: PERIOD_KEYS.from, label: langDic.PeriodFrom[lang] },
    { key: PERIOD_KEYS.to, label: langDic.PeriodTo[lang] },
  ];
  return (
    <div data-testid="CalendarTab_WRAP" className={styles.tab}>
      {tabs.map((tab) => {
        const dateLabel =
          formatCalendarDate(selectedPeriod[getPeriodDateKey(tab.key)]) ||
          "...*";
        const tabClassName =
          selectedPeriodInterval === tab.key ? styles.titleActiv : styles.title;

        return (
          <button
            type="button"
            key={tab.key}
            data-testid={`CalendarTabButton_${tab.key.toUpperCase()}`}
            className={tabClassName}
            onClick={() => {
              setSelectedPeriodInterval(tab.key);
            }}
            aria-label={`${langDic.TabButtonAria[lang]} ${tab.label}`}
          >
            <Typography
              data-testid={`CalendarTabTitle_${tab.key.toUpperCase()}`}
              tag="span"
              fontClass="body1Medium"
              aria-label={tab.label}
            >
              {tab.label} {dateLabel}
            </Typography>
          </button>
        );
      })}
    </div>
  );
};
