import { BaseComponents } from "~baseComponents";
import type { IButtonProps } from "../Button";
import styles from "./ModalFooterButton.module.css";

type ModalFooterButtonItem = Pick<
  IButtonProps,
  "onClick" | "disabled" | "variant" | "isRounded" | "isIcon"
> & {
  text: string;
};

export interface IModalFooterButtonProps {
  buttonList: ModalFooterButtonItem[];
}

export const ModalFooterButton = ({ buttonList }: IModalFooterButtonProps) => (
  <div data-testid="ModalFooterButton_WRAP" className={styles.wrapper}>
    {buttonList.map(({ text, ...buttonProps }) => (
      <BaseComponents.Button
        key={text}
        aria-label={text}
        data-testid="ModalFooter_BUTTON"
        size="large"
        {...buttonProps}
      >
        {text}
      </BaseComponents.Button>
    ))}
  </div>
);
