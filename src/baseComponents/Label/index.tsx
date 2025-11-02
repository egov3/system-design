import { Typography } from "../Typography";
import styles from "./Label.module.css";

interface ILabelProps {
  variant: "double" | "single" | "overline";
  headerText?: string;
  footerText?: string;
  mainText: string;
  className?: string;
}

interface ITextProps {
  text: string;
}

const SecondaryText = ({ text }: ITextProps) => (
  <Typography
    tag="span"
    data-testid="LabelText_Secondary"
    aria-label={text}
    className={styles.secondaryText}
    fontClass="caption1Regular"
  >
    {text}
  </Typography>
);

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

export const Label = ({
  variant,
  mainText,
  footerText = "",
  headerText = "",
  className = "",
}: ILabelProps) => (
  <>
    {variant === "single" && (
      <span className={className} data-testid="Label_SINGLE">
        <MainText text={mainText} />
      </span>
    )}
    {variant === "double" && (
      <span className={className} data-testid="Label_DOUBLE">
        <MainText text={mainText} />
        <SecondaryText text={footerText} />
      </span>
    )}
    {variant === "overline" && (
      <span className={className} data-testid="Label_OVERLINE">
        <SecondaryText text={headerText} />
        <MainText text={mainText} />
      </span>
    )}
  </>
);
