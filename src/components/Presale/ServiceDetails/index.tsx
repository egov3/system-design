import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { IServiceDetailsProps } from "~interfaces/PresaleTemplate";
import { passport } from "../../../../__tests__/Mock/presale";
import { PassportDetails } from "../PassportDetails";
import { ShowPassportBtn } from "../ShowPassportBtn";
import styles from "./ServiceDetails.module.css";

export const ServiceDetails = ({ serviceId, lang }: IServiceDetailsProps) => {
  const [showPassport, setShowPassport] = useState<boolean>(false);

  const langDic = {
    servicesCommon: i18n.Services.titles,
    servicesDetails: i18n.Services.details,
  };

  return (
    <>
      <div className={styles.accordionBody} data-testid="ServiceDetails_BODY">
        {langDic.servicesDetails[serviceId].map((item) => (
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
          aria-label={langDic.servicesCommon.informError[lang]}
          className={styles.informError}
          data-testid="ServiceDetails_ERROR"
          fontClass="caption1Regular"
          tag="p"
        >
          {langDic.servicesCommon.informError[lang]}
        </BaseComponents.Typography>
        <BaseComponents.Button
          className={styles.errorBtn}
          data-testid="ServiceDetailsError_BUTTON"
          size="small"
          variant="secondary"
        >
          <BaseComponents.Typography
            aria-label={langDic.servicesCommon.informErrorBtn[lang]}
            data-testid="ServiceDetailsErrorBtn_WRAP"
            fontClass="caption1Medium"
            tag="span"
          >
            {langDic.servicesCommon.informErrorBtn[lang]}
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
              title: langDic.servicesCommon.passportBtnText[lang],
              isClosable: true,
            }}
            lang={lang}
            variant="small"
          >
            <PassportDetails details={passport.P601} lang={lang} />
          </BaseComponents.Modal>
        )}
      </div>
    </>
  );
};
