// src/components/IdentityComponent/InputWarning.tsx

import React from "react";
import Icons from "@egov3/graphics";

import { joinClasses } from "~utils/joinClasses";

import styles from "./WarningText.module.css";
import { Components } from "~components";

export interface IWarningTextProps {
  align: "center" | "left";
  isNeedIcon: boolean;
  errorText: string | [string, string];
}

const renderTexts = (errorText: string | [string, string]) => {
  if (typeof errorText === "string") {
    return (
      <Components.Typography
        tag="span"
        fontClass="body3Regular"
        data-testid="InputWarning_TEXT"
        className={styles.textError}
        aria-label={errorText}
      >
        {errorText}
      </Components.Typography>
    );
  }

  return errorText.map((text, idx) => (
    <div key={text} className={styles.errorTextBlock} data-testid="InputWarningError_KEY">
      <Components.Typography
        tag="span"
        fontClass="body3Regular"
        data-testid={`InputWarning_TEXT_${idx}`}
        className={styles.textError}
        aria-label={text}
      >
        {text}
      </Components.Typography>
    </div>
  ));
};

export const WarningText = ({
  isNeedIcon,
  align,
  errorText,
}: IWarningTextProps) => {
  return (
    <div
      className={joinClasses(
        styles.error,
        align === "center" ? styles.textAlignCenter : styles.textAlignLeft
      )}
      data-testid="InputWarning_ERROR"
    >
      {isNeedIcon && (
        <div data-testid="InputWarning_ICON" className={styles.icon}>
          <Icons.General.Error
            fill="var(--text-error)"
            width={20}
            height={20}
            data-testid="InputWarningIcon_WARNING"
          />
        </div>
      )}
      <div data-testid="InputWarningError_TEXT">{renderTexts(errorText)}</div>
    </div>
  );
};
