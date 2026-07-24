import { PersonalIDLabeledIllustration } from "@egov3/graphics/Documents/PersonalIDLabeled";
import type { IPersonalIDTemplateProps } from "~interfaces/PersonalIDTemplate";
import { joinClasses } from "~utils/joinClasses";
import styles from "./PersonalIDTemplate.module.css";

export const PersonalIDTemplate = ({
  userPhoto,
  userSign,
  className,
}: IPersonalIDTemplateProps) => (
  <div
    className={joinClasses(styles.card, className)}
    data-testid="PersonalIDTemplate"
  >
    <PersonalIDLabeledIllustration className={styles.illustration} />

    <div className={styles.overlay} data-testid="PersonalIDTemplate_OVERLAY">
      <img
        className={styles.photo}
        src={userPhoto}
        alt="user-photo"
        data-testid="PersonalIDTemplate_PHOTO"
      />
      <img
        className={styles.sign}
        src={userSign}
        alt="user-sign"
        data-testid="PersonalIDTemplate_SIGN"
      />
    </div>
  </div>
);
