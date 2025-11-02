import { Icons } from "@egov3/graphics";

import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./WarningText.module.css";

export interface IWarningTextProps {
  align: "center" | "left";
  isNeedIcon: boolean;
  errorText?: string;
}

export const WarningText = ({
  isNeedIcon,
  align,
  errorText,
}: IWarningTextProps) => {
  if (errorText) {
    return (
      <div
        className={joinClasses(
          styles.error,
          align === "center" ? styles.textAlignCenter : styles.textAlignLeft,
        )}
        data-testid="InputWarning_ERROR"
      >
        {isNeedIcon && (
          <div data-testid="InputWarning_ICON" className={styles.iconWrapper}>
            <Icons.General.Error
              className={styles.icon}
              data-testid="InputWarningIcon_WARNING"
            />
          </div>
        )}
        <div data-testid="InputWarningText_WRAP" className={styles.textWrap}>
          <Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="InputWarning_TEXT"
            className={styles.textError}
            aria-label={errorText}
          >
            {errorText}
          </Typography>
        </div>
      </div>
    );
  }

  return null;
};
