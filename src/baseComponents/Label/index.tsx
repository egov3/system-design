import { Typography } from "../Typography";
import styles from "./Label.module.css";

export interface ILabelProps {
  variant: "double" | "single";
  mainText: string;
  secondaryText?: string;
  inverseStyle?: boolean;
}

interface ITextProps {
  text: string;
  inverseStyle?: boolean;
}

const MainText = ({ text, inverseStyle }: ITextProps) => (
  <Typography
    tag="span"
    data-testid="LabelText_MAIN"
    aria-label={text}
    className={inverseStyle ? styles.secondaryText : styles.mainText}
    fontClass="body2Regular"
  >
    {text}
  </Typography>
);

const SecondaryText = ({ text, inverseStyle }: ITextProps) => (
  <Typography
    tag="span"
    data-testid="LabelText_Secondary"
    aria-label={text}
    className={inverseStyle ? styles.mainText : styles.secondaryText}
    fontClass="caption1Regular"
  >
    {text}
  </Typography>
);

export const Label = ({
  variant,
  mainText,
  secondaryText = "",
  inverseStyle,
}: ILabelProps) => (
  <>
    {variant === "single" && (
      <span data-testid="Label_SINGLE">
        <MainText text={mainText} inverseStyle={inverseStyle} />
      </span>
    )}
    {variant === "double" && (
      <span data-testid="Label_DOUBLE">
        <MainText text={mainText} inverseStyle={inverseStyle} />
        <SecondaryText text={secondaryText} inverseStyle={inverseStyle} />
      </span>
    )}
  </>
);
