import { useState } from "react";
import { Button, Modal, Typography } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangGeneric, ILangProps } from "~interfaces/common";
import { type IPassportDetailsItem, PassportDetails } from "../PassportDetails";
import styles from "./ServiceDetails.module.css";

export interface IServiceDetailsItem {
  title: ILangGeneric<string>;
  description: ILangGeneric<string>;
}

export interface IServiceDetailsProps extends ILangProps {
  passportDetails: IPassportDetailsItem[];
  servicesDetails: IServiceDetailsItem[];
  howToBtnHandler?: () => void;
}

export const ServiceDetails = ({
  passportDetails,
  servicesDetails,
  lang,
  howToBtnHandler,
}: IServiceDetailsProps) => {
  const [isShowPassport, setIsShowPassport] = useState<boolean>(false);

  const langDic = { common: i18n.Common, ServiceDetails: i18n.ServiceDetails };

  return (
    <>
      <div className={styles.accordionBody} data-testid="ServiceDetails_BODY">
        {servicesDetails.map((item) => (
          <div
            key={item.title[lang]}
            className={styles.serviceDetailsItem}
            data-testid="ServiceDetails_ITEM"
          >
            <Typography
              aria-label={item.title[lang]}
              className={styles.itemTitle}
              data-testid="ServiceDetails_TITLE"
              fontClass="caption1Regular"
              tag="span"
            >
              {item.title[lang]}
            </Typography>
            <Typography
              aria-label={item.description[lang]}
              className={styles.itemDescription}
              data-testid="ServiceDetails_DESCRIPTION"
              fontClass="body2Regular"
              tag="span"
            >
              {item.description[lang]}
            </Typography>
          </div>
        ))}
      </div>
      <div
        className={styles.AccordionFooter}
        data-testid="ServiceDetails_FOOTER"
      >
        <Typography
          aria-label={langDic.ServiceDetails.orderByPSC[lang]}
          className={styles.informError}
          data-testid="ServiceDetails_ERROR"
          fontClass="caption1Regular"
          tag="p"
        >
          {langDic.ServiceDetails.orderByPSC[lang]}
        </Typography>
        <Button
          className={styles.errorBtn}
          data-testid="ServiceDetailsError_BUTTON"
          size="small"
          variant="secondary"
          onClick={howToBtnHandler}
        >
          <Typography
            aria-label={langDic.ServiceDetails.howToApply[lang]}
            data-testid="ServiceDetailsErrorBtn_WRAP"
            fontClass="caption1Medium"
            tag="span"
          >
            {langDic.ServiceDetails.howToApply[lang]}
          </Typography>
        </Button>
        <Button
          aria-label={langDic.common.passportBtnText[lang]}
          data-testid="ShowPassport_BTN"
          onClick={() => {
            setIsShowPassport(!isShowPassport);
          }}
          size="small"
          variant="tinted"
          className={styles.showPassportBtn}
        >
          <Typography
            data-testid="ShowPassport_SPAN"
            fontClass="caption1Medium"
            tag="span"
          >
            {langDic.common.passportBtnText[lang]}
          </Typography>
        </Button>
        {isShowPassport && (
          <Modal
            isOpen={isShowPassport}
            setIsOpen={setIsShowPassport}
            header={{
              title: langDic.common.passportBtnText[lang],
              isClosable: true,
            }}
            lang={lang}
            variant="small"
          >
            <PassportDetails details={passportDetails} lang={lang} />
          </Modal>
        )}
      </div>
    </>
  );
};
