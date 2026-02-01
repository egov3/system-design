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
    <ol className={styles.accordionBody} data-testid="InstructionsOrder_LIST">
      {langDic[serviceId].map((item, index) => (
        <li
          className={styles.listItem}
          data-testid="InstructionsList_ITEMS"
          key={item[lang]}
        >
          <div
            className={styles.blockItem}
            data-testid="InstructionsBlock_ITEM"
          >
            <div
              className={styles.itemNumber}
              data-testid="InstructionsItem_NUMBER"
            >
              {index + 1}
            </div>
            <div
              className={styles.itemLine}
              data-testid="InstructionsList_LINE"
            ></div>
          </div>
          <BaseComponents.Typography
            tag="span"
            fontClass="body2Regular"
            className={styles.itemDescription}
            data-testid="InstructionsListItem_TEXT"
          >
            {item[lang]}
          </BaseComponents.Typography>
        </li>
      ))}
    </ol>
  );
};
