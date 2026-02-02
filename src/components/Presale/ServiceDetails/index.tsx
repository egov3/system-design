import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { IServiceDetailsProps } from "~interfaces/PresaleTemplate";
import { PassportDetails } from "../PassportDetails";
import { ShowPassportBtn } from "../ShowPassportBtn";
import styles from "./ServiceDetails.module.css";

export const ServiceDetails = ({
  passportDetails,
  servicesDetails,
  lang,
}: IServiceDetailsProps) => {
  const [showPassport, setShowPassport] = useState<boolean>(false);

  const langDic = i18n.Services.titles;

  return (
    <>
      <div className={styles.accordionBody} data-testid="ServiceDetails_BODY">
        {servicesDetails.map((item) => (
          <div
            key={item.title[lang]}
            className={styles.serviceDetailsItem}
            data-testid="ServiceDetails_ITEM"
          >
            <BaseComponents.Typography
              aria-label={item.title[lang]}
              className={styles.itemTitle}
              data-testid="ServiceDetails_TITLE"
              fontClass="caption1Regular"
              tag="span"
            >
              {item.title[lang]}
            </BaseComponents.Typography>
            <BaseComponents.Typography
              aria-label={item.description[lang]}
              className={styles.itemDescription}
              data-testid="ServiceDetails_DESCRIPTION"
              fontClass="body2Regular"
              tag="span"
            >
              {item.description[lang]}
            </BaseComponents.Typography>
          </div>
        ))}
      </div>
      <div
        className={styles.AccordionFooter}
        data-testid="ServiceDetails_FOOTER"
      >
        <BaseComponents.Typography
          aria-label={langDic.informError[lang]}
          className={styles.informError}
          data-testid="ServiceDetails_ERROR"
          fontClass="caption1Regular"
          tag="p"
        >
          {langDic.informError[lang]}
        </BaseComponents.Typography>
        <BaseComponents.Button
          className={styles.errorBtn}
          data-testid="ServiceDetailsError_BUTTON"
          size="small"
          variant="secondary"
        >
          <BaseComponents.Typography
            aria-label={langDic.informErrorBtn[lang]}
            data-testid="ServiceDetailsErrorBtn_WRAP"
            fontClass="caption1Medium"
            tag="span"
          >
            {langDic.informErrorBtn[lang]}
          </BaseComponents.Typography>
        </BaseComponents.Button>
        <ShowPassportBtn
          setShowPassport={setShowPassport}
          showPassport={showPassport}
          lang={lang}
        />
        {showPassport && (
          <BaseComponents.Modal
            open={showPassport}
            setOpen={setShowPassport}
            header={{
              title: langDic.passportBtnText[lang],
              isClosable: true,
            }}
            lang={lang}
            variant="small"
          >
            <PassportDetails details={passportDetails} lang={lang} />
          </BaseComponents.Modal>
        )}
      </div>
    </>
  );
};
