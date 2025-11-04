import { Typography } from "../Typography";
import styles from "./Label.module.css";

export interface ILabelProps {
  mainText: string;
  secondaryText?: string;
  error?: boolean;
}

export const Label = ({ mainText, secondaryText = "", error }: ILabelProps) => (
  <span data-testid="Label_SINGLE" className={styles.label}>
    <Typography
      tag="span"
      data-testid="LabelText_MAIN"
      aria-label={mainText}
      className={error ? styles.errorText : styles.mainText}
      fontClass="body2Regular"
    >
      {mainText}
    </Typography>
    {secondaryText && (
      <Typography
        tag="span"
        data-testid="LabelText_SECONDARY"
        aria-label={secondaryText}
        className={styles.secondaryText}
        fontClass="caption1Regular"
      >
        {secondaryText}
      </Typography>
    )}
  </span>
);
