import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import type { TReleasedServices } from "~interfaces/PresaleTemplate";
import styles from "./Instructions.module.css";

export interface IInstructionsProps extends ILangProps {
  serviceId: TReleasedServices;
}

export const Instructions = ({ serviceId, lang }: IInstructionsProps) => {
  const langDic = i18n.Services.instructions;
  return (
    <ol className={styles.accordionBody}>
      {langDic[serviceId].map((item, index) => (
        <li className={styles.listItem} key={item[lang]}>
          <div className={styles.blockItem}>
            <div className={styles.itemNumber}>{index + 1}</div>
            <div className={styles.itemLine}></div>
          </div>
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            className={styles.itemDescription}
          >
            {item[lang]}
          </BaseComponents.Typography>
        </li>
      ))}
    </ol>
  );
};
