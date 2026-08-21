import { buildWordSegments } from "~utils/string/buildWordSegments";
import { type TFontClass, Typography } from "../Typography";
import styles from "./TextWithAction.module.css";

export interface ITextWithActionProps {
  textTemplate: string;
  actions?: (() => void)[];
  fontClass?: TFontClass;
  className?: string;
}

export const TextWithAction = ({
  textTemplate,
  actions = [],
  fontClass = "body2Regular",
  className,
}: ITextWithActionProps) => (
  <Typography
    tag="span"
    fontClass={fontClass}
    className={className}
    data-testid="TextWithAction_WRAPPER"
  >
    {buildWordSegments(textTemplate, actions).map((segment) =>
      segment.onClick ? (
        <button
          type="button"
          key={segment.key}
          className={styles.action}
          data-testid="TextWithAction_ACTION"
          onClick={segment.onClick}
        >
          {segment.text}
        </button>
      ) : (
        <span key={segment.key} data-testid="TextWithAction_PLAIN_TEXT">
          {segment.text}
        </span>
      ),
    )}
  </Typography>
);
