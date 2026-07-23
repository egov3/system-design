import { PersonalIDIllustration } from "@egov3/graphics/Documents/PersonalID";
import type { IPersonalIDTemplateProps } from "~interfaces/PersonalIDTemplate";
import { joinClasses } from "~utils/joinClasses";
import styles from "./PersonalIDTemplate.module.css";

const ASPECT_RATIO = 231 / 363;

export const PersonalIDTemplate = ({
  userPhoto,
  userSign,
  userData,
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

        <div className={joinClasses(styles.field, styles.lastName)}>
          <span className={styles.field__label}>ТЕГІ / ФАМИЛИЯ</span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_LASTNAME"
          >
            {userData.lastName}
          </span>
        </div>

        <div className={joinClasses(styles.field, styles.firstName)}>
          <span className={styles.field__label}>АТЫ / ИМЯ</span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_FIRSTNAME"
          >
            {userData.firstName}
          </span>
        </div>

        <div className={joinClasses(styles.field, styles.middleName)}>
          <span className={styles.field__label}>ӘКЕСІНІҢ АТЫ / ОТЧЕСТВО</span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_MIDDLENAME"
          >
            {userData.middleName}
          </span>
        </div>

        <div className={joinClasses(styles.field, styles.birthDate)}>
          <span className={styles.field__label}>
            ТУҒАН КҮНІ / ДАТА РОЖДЕНИЯ
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_BIRTHDATE"
          >
            {userData.birthDate}
          </span>
        </div>

        <div className={joinClasses(styles.field, styles.gender)}>
          <span className={styles.field__label}>ЖЫНЫСЫ / ПОЛ</span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_GENDER"
          >
            {userData.gender}
          </span>
        </div>

        <div className={joinClasses(styles.field, styles.iin)}>
          <span className={styles.field__label}>ЖСН / ИИН</span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_IIN"
          >
            {userData.IIN}
          </span>
        </div>
      </div>
    </div>
  );
};
