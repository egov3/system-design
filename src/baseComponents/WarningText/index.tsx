import { Icons } from "@egov3/graphics";

import { Label } from "../Label";
import styles from "./WarningText.module.css";

export interface IWarningTextProps {
  errorText: string;
  isAlignedCenter?: boolean;
  isNeedIcon?: boolean;
}

export const WarningText = ({
  errorText,
  isAlignedCenter = false,
  isNeedIcon = false,
}: IWarningTextProps) => (
  <div data-testid="Warning_WRAP" className={styles.wrap}>
    {isNeedIcon && (
      <div data-testid="Warning_ICON">
        <Icons.General.Error className={styles.iconWrapper} />
      </div>
    )}
    <div
      className={isAlignedCenter && styles.centerAlign}
      data-testid="Warning_TEXT"
    >
      <Label mainText={errorText} error={true} />
    </div>
  </div>
);
