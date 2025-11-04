import { Typography } from "../Typography";
import styles from "./Label.module.css";

export interface ILabelProps {
  variant: "double" | "single";
  mainText: string;
  secondaryText?: string;
}

interface ITextProps {
  text: string;
}

const MainText = ({ text }: ITextProps) => (
  <Typography
    tag="span"
    data-testid="LabelText_MAIN"
    aria-label={text}
    className={styles.mainText}
    fontClass="body2Regular"
  >
    {text}
  </Typography>
);

const SecondaryText = ({ text }: ITextProps) => (
  <Typography
    tag="span"
    data-testid="LabelText_SECONDARY"
    aria-label={text}
    className={styles.secondaryText}
    fontClass="caption1Regular"
  >
    {text}
  </Typography>
);

export const Label = ({
  variant,
  mainText,
  secondaryText = "",
}: ILabelProps) => (
  <>
    {variant === "single" && (
      <span data-testid="Label_SINGLE" className={styles.label}>
        <MainText text={mainText} />
      </span>
    )}
    {variant === "double" && (
      <span data-testid="Label_DOUBLE" className={styles.label}>
        <MainText text={mainText} />
        <SecondaryText text={secondaryText} />
      </span>
    )}
  </>
);
