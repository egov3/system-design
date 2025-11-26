import { Icons } from "@egov3/graphics";
import type { Dispatch, SetStateAction } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./Feedback.module.css";

export interface IFeedbackProps extends ILangProps {
  onAction: () => void;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Feedback = ({
  onAction,
  value,
  onChange,
  lang,
  rating,
  setRating,
  setOpen,
}: IFeedbackProps) => {
  const langDic = i18n.Feedback;

  const getEmojiColor = (emojiRating: number) => {
    if (rating !== emojiRating) return "var(--icon-tertiary)";

    switch (emojiRating) {
      case 1:
        return "var(--icon-error-color)";
      case 2:
        return "var(--icon-warning-color)";
      case 3:
        return "var(--icon-accent-color)";
      case 4:
      case 5:
        return "var(--icon-success)";
    }
  };

  const handleEmojiClick = (emojiRating: number) => {
    setRating(emojiRating);
  };

  return (
    <BaseComponents.Overlay>
      <div data-testid="Feedback_WRAP" className={styles.wrap}>
        <div data-testid="Feedback_WRAP_RATING" className={styles.card}>
          <BaseComponents.Label
            variant="big"
            isSpaced
            text={langDic.titleRating[lang]}
            Icon={Icons.General.Close}
            onAction={() => {
              setOpen(false);
            }}
          />
          <div data-testid="Feedback_RATING_CONTENT" className={styles.content}>
            <div data-testid="Feedback_ICONS" className={styles.icons}>
              <Icons.Emoji.Angry
                className={styles.icon}
                fill={getEmojiColor(1)}
                data-color={getEmojiColor(1)}
                aria-label={langDic.angryEmoji[lang]}
                onClick={() => {
                  handleEmojiClick(1);
                }}
              />
              <Icons.Emoji.Frowning
                className={styles.icon}
                fill={getEmojiColor(2)}
                data-color={getEmojiColor(2)}
                aria-label={langDic.frowningEmoji[lang]}
                onClick={() => {
                  handleEmojiClick(2);
                }}
              />
              <Icons.Emoji.Neutral
                className={styles.icon}
                fill={getEmojiColor(3)}
                data-color={getEmojiColor(3)}
                aria-label={langDic.neutralEmoji[lang]}
                onClick={() => {
                  handleEmojiClick(3);
                }}
              />
              <Icons.Emoji.Smile
                className={styles.icon}
                fill={getEmojiColor(4)}
                data-color={getEmojiColor(4)}
                aria-label={langDic.smileEmoji[lang]}
                onClick={() => {
                  handleEmojiClick(4);
                }}
              />
              <Icons.Emoji.Grin
                className={styles.icon}
                fill={getEmojiColor(5)}
                data-color={getEmojiColor(5)}
                aria-label={langDic.grinEmoji[lang]}
                onClick={() => {
                  handleEmojiClick(5);
                }}
              />
            </div>
            <BaseComponents.Typography
              tag="span"
              fontClass="caption2Regular"
              className={styles.text}
              data-testid="Feedback_DESCRIPTION"
              aria-label={langDic.descriptionText[lang]}
            >
              {langDic.descriptionText[lang]}
            </BaseComponents.Typography>
          </div>
        </div>
        <div data-testid="Feedback_WRAP_INPUT" className={styles.card}>
          <BaseComponents.Label
            variant="small"
            isSpaced
            text={langDic.titleFeedback[lang]}
          />
          <div className={styles.content} data-testid="Feedback_CONTENT_INPUT">
            <BaseComponents.TextareaField
              id="serviceFeedbackInput"
              aria-label={langDic.inputAriaLabel[lang]}
              labelText={langDic.inputLabel[lang]}
              value={value}
              onChange={onChange}
            />
            <BaseComponents.Button
              size="large"
              className={styles.button}
              onClick={onAction}
              data-testid="Feedback_BTN"
            >
              {langDic.sendButton[lang]}
            </BaseComponents.Button>
          </div>
        </div>
      </div>
    </BaseComponents.Overlay>
  );
};
