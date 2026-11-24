import { Typography } from "../Typography";
import styles from "./TextList.module.css";

export interface ITextListItem {
  id: string;
  text: string;
}

export interface ITextListProps {
  items: ITextListItem[];
}

export const TextList = ({ items }: ITextListProps) => (
  <ul className={styles.list} data-testid="TextList_LIST">
    {items.map((item) => (
      <Typography
        className={styles.item}
        data-testid="TextList_ITEM"
        fontClass="body1Regular"
        key={item.id}
        tag="li"
      >
        {item.text}
      </Typography>
    ))}
  </ul>
);
