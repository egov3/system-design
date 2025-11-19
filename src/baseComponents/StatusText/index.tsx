// src/baseComponents/StatusText/index.tsx
import { Icons } from "@egov3/graphics";

import { TextPair } from "../TextPair";
import styles from "./StatusText.module.css";

export interface IStatusTextProps {
  text: string;
  isAlignedCenter?: boolean;
  isNeedIcon?: boolean;
  variant?: "ERROR" | "INFO" | "SUCCESS";
}

export const StatusText = ({
  text,
  isAlignedCenter = false,
  isNeedIcon = false,
  variant = "ERROR",
}: IStatusTextProps) => (
  <div data-testid="StatusText_WRAP" className={styles.wrap}>
    {isNeedIcon && variant === "ERROR" && (
      <div data-testid="StatusTextError_ICON">
        <Icons.General.Error
          className={styles.iconWrapper}
          fill="var(--icon-error-color)"
        />
      </div>
    )}
    {isNeedIcon && variant === "INFO" && (
      <div data-testid="StatusTextInfo_ICON">
        <Icons.General.InfoStroke
          className={styles.iconWrapper}
          fill="var(--icon-accent-color)"
        />
      </div>
    )}
    {isNeedIcon && variant === "SUCCESS" && (
      <div data-testid="StatusTextSuccess_ICON">
        <Icons.General.CheckedRound
          className={styles.iconWrapper}
          fill="var(--icon-success)"
        />
      </div>
    )}
    <div
      className={isAlignedCenter ? styles.centerAlign : undefined}
      data-testid="StatusText_TEXT"
    >
      <TextPair mainText={text} variant={variant} />
    </div>
  </div>
);
