import { PersonalIDLabeledIllustration } from "@egov3/graphics/Documents/PersonalIDLabeled";

import type { IPersonalIDTemplateProps } from "~interfaces/PersonalIDTemplate";

import { Typography } from "~baseComponents";
import { joinClasses } from "~utils/joinClasses";

import styles from "./PersonalIDTemplate.module.css";

const CardImage = ({
  src,
  className,
  testId,
  isInvalid,
  invalidTestId,
}: {
  src?: string;
  className: string;
  testId: string;
  isInvalid: boolean;
  invalidTestId: string;
}) => (
  <>
    {src ? (
      <img className={className} src={src} alt="" data-testid={testId} />
    ) : (
      <div
        className={joinClasses(className, styles.empty)}
        data-testid={testId}
      />
    )}
    {isInvalid && (
      <div
        className={joinClasses(className, styles.invalid)}
        data-testid={invalidTestId}
      />
    )}
  </>
);

export const PersonalIDTemplate = ({
  userPhoto,
  userSign,
  userData,
  className,
  isPhotoInvalid = false,
  isSignInvalid = false,
}: IPersonalIDTemplateProps) => (
  <div
    className={joinClasses(styles.card, className)}
    data-testid="PersonalIDTemplate"
  >
    <PersonalIDLabeledIllustration className={styles.illustration} />

    <div className={styles.overlay} data-testid="PersonalIDTemplate_OVERLAY">
      <CardImage
        src={userPhoto}
        className={styles.photo}
        testId="PersonalIDTemplate_PHOTO"
        isInvalid={isPhotoInvalid}
        invalidTestId="PersonalIDTemplate_PHOTO_INVALID"
      />

      <CardImage
        src={userSign}
        className={styles.sign}
        testId="PersonalIDTemplate_SIGN"
        isInvalid={isSignInvalid}
        invalidTestId="PersonalIDTemplate_SIGN_INVALID"
      />

      <Typography
        tag="span"
        fontClass="subtitles1"
        className={joinClasses(styles.field, styles.lastName)}
        data-testid="PersonalIDTemplate_LASTNAME_VALUE"
      >
        {userData?.lastName}
      </Typography>

      <Typography
        tag="span"
        fontClass="subtitles1"
        className={joinClasses(styles.field, styles.firstName)}
        data-testid="PersonalIDTemplate_FIRSTNAME_VALUE"
      >
        {userData?.firstName}
      </Typography>

      <Typography
        tag="span"
        fontClass="subtitles1"
        className={joinClasses(styles.field, styles.middleName)}
        data-testid="PersonalIDTemplate_MIDDLENAME_VALUE"
      >
        {userData?.middleName}
      </Typography>

      <Typography
        tag="span"
        fontClass="subtitles1"
        className={joinClasses(styles.field, styles.birthDate)}
        data-testid="PersonalIDTemplate_BIRTHDATE_VALUE"
      >
        {userData?.birthDate}
      </Typography>

      <Typography
        tag="span"
        fontClass="subtitles1"
        className={joinClasses(styles.field, styles.gender)}
        data-testid="PersonalIDTemplate_GENDER_VALUE"
      >
        {userData?.gender}
      </Typography>

      <Typography
        tag="span"
        fontClass="heading2"
        className={joinClasses(styles.field, styles.iin)}
        data-testid="PersonalIDTemplate_IIN_VALUE"
      >
        {userData?.IIN}
      </Typography>
    </div>
  </div>
);
