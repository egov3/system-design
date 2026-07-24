import { PersonalIDIllustration } from "@egov3/graphics/Documents/PersonalID";
import type { IPersonalIDTemplateProps } from "~interfaces/PersonalIDTemplate";
import styles from "./PersonalIDTemplate.module.css";

const ASPECT_RATIO = 231 / 363;

export const PersonalIDTemplate = ({
  userPhoto,
  userSign,
  width = 363,
}: IPersonalIDTemplateProps) => {
  const height =
    typeof width === "number" ? Math.round(width * ASPECT_RATIO) : undefined;

  return (
    <div
      className={styles.card}
      style={{ width }}
      data-testid="PersonalIDTemplate"
    >
      <PersonalIDIllustration
        className={styles.illustration}
        width={width}
        height={height}
      />

      <div className={styles.overlay}>
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
};
