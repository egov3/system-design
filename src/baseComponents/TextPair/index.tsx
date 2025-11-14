import { toPascalCase } from "~utils/string/toPascalCase";
import { Typography } from "../Typography";
import styles from "./TextPair.module.css";

export interface ITextPairProps {
  mainText: string;
  secondaryText?: string;
  variant?: "REGULAR" | "ERROR" | "INFO" | "SUCCESS";
}

export const TextPair = ({
  mainText,
  secondaryText = "",
  variant = "REGULAR",
}: ITextPairProps) => (
  <span data-testid="Label_WRAPPER" className={styles.label}>
    <Typography
      tag="span"
      data-testid="TextPair_MAIN"
      aria-label={mainText}
      className={styles[`textVariant${toPascalCase(variant)}`]}
      fontClass="body2Regular"
    >
      {mainText}
    </Typography>
    {secondaryText?.length > 0 && (
      <Typography
        tag="span"
        data-testid="TextPair_SECONDARY"
        aria-label={secondaryText}
        className={styles.secondaryText}
        fontClass="caption1Regular"
      >
        {secondaryText}
      </Typography>
    )}
  </span>
);
