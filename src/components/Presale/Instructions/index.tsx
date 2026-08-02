import { Typography } from "~baseComponents";
import type { ILangGeneric, ILangProps } from "~interfaces/common";
import styles from "./Instructions.module.css";

export interface IInstructionsProps extends ILangProps {
  instructions: { text: ILangGeneric<string> }[];
}

export const Instructions = ({ instructions, lang }: IInstructionsProps) => (
  <ol className={styles.accordionBody} data-testid="InstructionsOrder_LIST">
    {instructions.map((item, index) => (
      <li
        className={styles.listItem}
        data-testid="InstructionsList_ITEMS"
        key={item.text[lang]}
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
          />
        </div>
        <Typography
          aria-label={item.text[lang]}
          tag="span"
          fontClass="body2Regular"
          className={styles.itemDescription}
          data-testid="InstructionsListItem_TEXT"
        >
          {item.text[lang]}
        </Typography>
      </li>
    ))}
  </ol>
);
