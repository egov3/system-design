import { Icons } from "@egov3/graphics";

import { Label } from "../Label";
import styles from "./WarningText.module.css";

export interface IWarningTextProps {
  errorText: string;
  isNeedIcon?: boolean;
  centerAlign?: boolean;
}

export const WarningText = ({
  errorText,
  isNeedIcon,
  centerAlign,
}: IWarningTextProps) => (
  <div data-testid="Warning_WRAP" className={styles.wrap}>
    {isNeedIcon && (
      <div data-testid="Warning_ICON">
        <Icons.General.Error className={styles.iconWrapper} />
      </div>
    )}
    <div
      className={centerAlign && styles.centerAlign}
      data-testid="Warning_TEXT"
    >
      <Label mainText={errorText} error={true} />
    </div>
  </div>
);
