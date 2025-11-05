import { BaseComponents } from "~baseComponents";
import type { TButtonVariant } from "~interfaces/Button";

import styles from "./RightMenuSectionItem.module.css";

export interface IRightMenuSectionItemProps {
  title: string;
  btnText: string;
  ariaLabel: string;
  btnOnClick: () => void;
  btnVariant?: TButtonVariant;
}

export const RightMenuSectionItem = ({
  title,
  btnText,
  btnOnClick,
  ariaLabel,
  btnVariant = "secondary",
}: IRightMenuSectionItemProps) => (
  <div data-testid="RightMenu_WRAPPER" className={styles.helpWrapper}>
    <BaseComponents.Typography
      tag="h5"
      fontClass="caption1Regular"
      data-testid="RightMenu_TITLE"
      className={styles.helpText}
    >
      {title}
    </BaseComponents.Typography>
    <BaseComponents.Button
      onClick={btnOnClick}
      className={styles.helpBtn}
      variant={btnVariant}
      size="small"
      ariaLabel={ariaLabel}
      dataTestid="RightMenu_BTN"
    >
      {btnText}
    </BaseComponents.Button>
  </div>
);
