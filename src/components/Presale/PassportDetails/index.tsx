import { BaseComponents } from "~baseComponents";
import type { ILangGeneric, ILangProps } from "~interfaces/common";
import styles from "./PassportDetails.module.css";

export interface IListItem {
  linkUrl?: string;
  text: ILangGeneric<string>;
}

export type IPassportDetailsItem =
  | {
      type: "text";
      title: ILangGeneric<string>;
      description: ILangGeneric<string>;
    }
  | {
      type: "list";
      title: ILangGeneric<string>;
      listItems: IListItem[];
    };

export interface IPassportDetailsProps extends ILangProps {
  details: IPassportDetailsItem[];
}

export const PassportDetails = ({ details, lang }: IPassportDetailsProps) => (
  <div
    data-testid="PassportDetails_WRAPPER"
    className={styles.passportDetailsWrapper}
  >
    {details.map((item) => (
      <div
        data-testid="PassportDetails_WRAP"
        className={styles.serviceDetailsItem}
        key={item.title[lang]}
      >
        <BaseComponents.Typography
          tag="span"
          fontClass="caption1Regular"
          data-testid="PassportDetails_TITLE"
          className={styles.itemTitle}
        >
          {item.title[lang]}
        </BaseComponents.Typography>
        {item.type === "list" ? (
          <ul
            data-testid="PassportDetailsUnordered_LIST"
            className={styles.listMark}
          >
            {item.listItems.map((listItem) => (
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
          </ul>
        ) : (
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            data-testid="PassportDetails_DESCRIPTION"
            className={styles.itemDescription}
          >
            {item.description[lang]}
          </BaseComponents.Typography>
        )}
      </div>
    ))}
  </div>
);
