import type { ComponentType, Dispatch, SetStateAction, SVGProps } from "react";
import { BaseComponents } from "~baseComponents";
import styles from "./IconToggleItem.module.css";

export interface IIconToggleItemProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  lock: boolean;
  unlock: Dispatch<SetStateAction<boolean>>;
}

export const IconToggleItem = ({
  Icon,
  text,
  lock,
  unlock,
}: IIconToggleItemProps) => {
  return (
    <div data-testid="IconToggleItem" className={styles.wrap}>
      <Icon data-testid="IconToggleItem_ICON" />
      <BaseComponents.Typography
        tag="span"
        data-testid="IconToggleItem_TEXT"
        className={styles.text}
        aria-label={text}
        fontClass="body1Regular"
      >
        {text}
      </BaseComponents.Typography>
      <BaseComponents.RadioToggle lock={lock} setLock={unlock} />
    </div>
  );
};
