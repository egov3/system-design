import { Typography } from "../Typography";
import styles from "./Label.module.css";

export interface ILabelProps {
  mainText: string;
  secondaryText?: string;
  error?: boolean;
}

export const Label = ({ mainText, secondaryText = "", error = false }: ILabelProps) => (
  <span data-testid="Label_WRAPPER" className={styles.label}>
    <Typography
      tag="span"
      data-testid="LabelText_MAIN"
      aria-label={mainText}
      className={error ? styles.errorText : styles.mainText}
      fontClass="body2Regular"
    >
      {mainText}
    </Typography>
    {secondaryText?.length > 0 && (
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
