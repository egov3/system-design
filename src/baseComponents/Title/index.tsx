import { joinClasses } from "~utils/joinClasses";
import { type TFontClass, Typography } from "../Typography";
import styles from "./Title.module.css";

export type TTitleSize = "small" | "medium" | "large";

export interface ITitleProps {
  isCentered?: boolean;
  subtext?: string;
  size: TTitleSize;
  title: string;
}

export const Title = ({ isCentered, subtext, size, title }: ITitleProps) => {
  const titleFontClassMap: Record<TTitleSize, Partial<TFontClass>> = {
    small: "subtitles1",
    medium: "heading3",
    large: "heading1",
  };

  const subtextFontClassMap: Record<TTitleSize, Partial<TFontClass>> = {
    small: "body2Regular",
    medium: "body2Regular",
    large: "body1Regular",
  };

  return (
    <div
      className={joinClasses(styles.wrapper, isCentered && styles.centered)}
      data-testid="Title_WRAPPER"
    >
      <Typography
        tag="span"
        fontClass={titleFontClassMap[size]}
        data-testid="Title_TITLE"
        aria-label={title}
      >
        {title}
      </Typography>

      {subtext && (
        <Typography
          tag="span"
          fontClass={subtextFontClassMap[size]}
          data-testid="Title_SUBTEXT"
          aria-label={subtext}
        >
          {subtext}
        </Typography>
      )}
    </div>
  );
};
