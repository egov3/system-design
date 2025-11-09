import { toPascalCase } from "~utils/string/toPascalCase";
import { Typography } from "../Typography";
import styles from "./Label.module.css";

export interface ILabelProps {
  mainText: string;
  secondaryText?: string;
  variant?: "REGULAR" | "ERROR" | "INFO" | "SUCCESS";
}

export const Label = ({
  mainText,
  secondaryText = "",
  variant = "REGULAR",
}: ILabelProps) => (
  <span data-testid="Label_WRAPPER" className={styles.label}>
    <Typography
      tag="span"
      data-testid="LabelText_MAIN"
      aria-label={mainText}
      className={styles[`textVariant${toPascalCase(variant)}`]}
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
