import { Button } from "../Button";
import styles from "./ModalFooterButton.module.css";

export interface IModalFooterButtonProps {
  buttonList: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    dataTestid?: string;
  }[];
}

export const ModalFooterButton = ({ buttonList }: IModalFooterButtonProps) => (
  <div data-testid="ModalFooterButton_WRAP" className={styles.wrapper}>
    {buttonList.map((item) => (
      <Button
        aria-label={item.text}
        data-testid={item.dataTestid}
        disabled={item.disabled}
        onClick={item.onClick}
        key={item.text}
        size="large"
      >
        {item.text}
      </Button>
    ))}
  </div>
);
