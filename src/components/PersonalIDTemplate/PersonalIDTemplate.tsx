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

        <div
          className={joinClasses(styles.field, styles.lastName)}
          data-testid="PersonalIDTemplate_LASTNAME_FIELD"
        >
          <span
            className={styles.field__label}
            data-testid="PersonalIDTemplate_LASTNAME_LABEL"
          >
            ТЕГІ / ФАМИЛИЯ
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_LASTNAME_VALUE"
          >
            {userData.lastName}
          </span>
        </div>

        <div
          className={joinClasses(styles.field, styles.firstName)}
          data-testid="PersonalIDTemplate_FIRSTNAME_FIELD"
        >
          <span
            className={styles.field__label}
            data-testid="PersonalIDTemplate_FIRSTNAME_LABEL"
          >
            АТЫ / ИМЯ
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_FIRSTNAME_VALUE"
          >
            {userData.firstName}
          </span>
        </div>

        <div
          className={joinClasses(styles.field, styles.middleName)}
          data-testid="PersonalIDTemplate_MIDDLENAME_FIELD"
        >
          <span
            className={styles.field__label}
            data-testid="PersonalIDTemplate_MIDDLENAME_LABEL"
          >
            ӘКЕСІНІҢ АТЫ / ОТЧЕСТВО
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_MIDDLENAME_VALUE"
          >
            {userData.middleName}
          </span>
        </div>

        <div
          className={joinClasses(styles.field, styles.birthDate)}
          data-testid="PersonalIDTemplate_BIRTHDATE_FIELD"
        >
          <span
            className={styles.field__label}
            data-testid="PersonalIDTemplate_BIRTHDATE_LABEL"
          >
            ТУҒАН КҮНІ / ДАТА РОЖДЕНИЯ
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_BIRTHDATE_VALUE"
          >
            {userData.birthDate}
          </span>
        </div>

        <div
          className={joinClasses(styles.field, styles.gender)}
          data-testid="PersonalIDTemplate_GENDER_FIELD"
        >
          <span
            className={styles.field__label}
            data-testid="PersonalIDTemplate_GENDER_LABEL"
          >
            ЖЫНЫСЫ / ПОЛ
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_GENDER_VALUE"
          >
            {userData.gender}
          </span>
        </div>

        <div
          className={joinClasses(styles.field, styles.iin)}
          data-testid="PersonalIDTemplate_IIN_FIELD"
        >
          <span
            className={styles.field__label}
            data-testid="PersonalIDTemplate_IIN_LABEL"
          >
            ЖСН / ИИН
          </span>
          <span
            className={styles.field__value}
            data-testid="PersonalIDTemplate_IIN_VALUE"
          >
            {userData.IIN}
          </span>
        </div>
      </div>
    </div>
  );
};
