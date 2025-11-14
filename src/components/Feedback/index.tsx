import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./Feedback.module.css";

interface IFeedbackProps extends ILangProps {
  onAction: () => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Feedback = ({ onAction, value, onChange, lang }: IFeedbackProps) => {
  const langDic = i18n.Feedback;
  return (
    <div data-testid="Feedback_WRAP" className={styles.wrap}>
      <div data-testid="Feedback_WRAP_RATING" className={styles.card}>
        <BaseComponents.Label
          variant="big"
          isSpaced
          text={langDic.inputLabel[lang]}
          Icon={Icons.General.Close}
        />

        <div data-testid="Feedback_RATING_CONTENT" className={styles.content}>
          <div data-testid="Feedback_ICONS" className={styles.icons}>
            <Icons.Emoji.Angry
              className={styles.icon}
              fill="var(--icon-tertiary)"
              aria-label={langDic.angryEmoji[lang]}
            />
            <Icons.Emoji.Frowning
              className={styles.icon}
              fill="var(--icon-tertiary)"
              aria-label={langDic.frowningEmoji[lang]}
            />
            <Icons.Emoji.Neutral
              className={styles.icon}
              fill="var(--icon-tertiary)"
              aria-label={langDic.neutralEmoji[lang]}
            />
            <Icons.Emoji.Smile
              className={styles.icon}
              fill="var(--icon-tertiary)"
              aria-label={langDic.smileEmoji[lang]}
            />
            <Icons.Emoji.Grin
              className={styles.icon}
              fill="var(--icon-tertiary)"
              aria-label={langDic.grinEmoji[lang]}
            />
          </div>
          <BaseComponents.Typography
            tag="span"
            fontClass="caption2Regular"
            className={styles.text}
            data-testid="Feedback_DESCRIPTION"
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
          <BaseComponents.InputField
            id="serviceFeedbackInput"
            ariaLabel={langDic.inputAriaLabel[lang]}
            labelText={langDic.inputLabel[lang]}
            value={value}
            onChange={onChange}
          />
          <BaseComponents.Button size="large" onClick={onAction}>
            {langDic.sendButton[lang]}
          </BaseComponents.Button>
        </div>
      </div>
    </div>
  );
};
