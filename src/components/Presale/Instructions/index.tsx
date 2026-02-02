import { BaseComponents } from "~baseComponents";
import type { IInstructionsProps } from "~interfaces/PresaleTemplate";
import styles from "./Instructions.module.css";

export const Instructions = ({ instructions, lang }: IInstructionsProps) => (
  <ol className={styles.accordionBody} data-testid="InstructionsOrder_LIST">
    {instructions.map((item, index) => (
      <li
        className={styles.listItem}
        data-testid="InstructionsList_ITEMS"
        key={item[lang]}
      >
        <div className={styles.blockItem} data-testid="InstructionsBlock_ITEM">
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
          aria-label={item[lang]}
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
