import { BaseComponents } from "~baseComponents";
import type { ILangProps } from "~interfaces/common";
import type { IServiceDetailsPassportItem } from "~interfaces/PresaleTemplate";
import styles from "./PassportDetails.module.css";

interface IPassportDetailsProps extends ILangProps {
  details: IServiceDetailsPassportItem[];
}

export const PassportDetails = ({ details, lang }: IPassportDetailsProps) => {
  if (!details.length) return null;

  return (
    <div
      data-testid="PassportDetails_WRAPPER"
      className={styles.passportDetailsWrapper}
    >
      {details.map((item) => (
        <div data-testid="PassportDetails_KEY" key={item.title[lang]}>
          <div
            data-testid="PassportDetails_WRAP"
            className={styles.serviceDetailsItem}
          >
            <BaseComponents.Typography
              tag="span"
              fontClass="caption1Regular"
              data-testid="PassportDetails_TITLE"
              className={styles.itemTitle}
            >
              {item.title[lang]}
            </BaseComponents.Typography>
            {item.listItems?.map((listItem) => (
              <BaseComponents.Typography
                tag="li"
                fontClass="body2Regular"
                data-testid="PassportDetails_LIST"
                key={listItem.text[lang]}
                className={styles.itemLink}
              >
                {listItem.linkUrl ? (
                  <a
                    className={styles.link}
                    data-testid="PassportDetails_LINK"
                    href={listItem.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {listItem.text[lang]}
                  </a>
                ) : (
                  listItem.text[lang]
                )}
              </BaseComponents.Typography>
            ))}
            <BaseComponents.Typography
              tag="span"
              fontClass="body2Regular"
              data-testid="PassportDetails_DESCRIPTION"
              className={styles.itemDescription}
            >
              {item.description?.[lang]}
            </BaseComponents.Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
