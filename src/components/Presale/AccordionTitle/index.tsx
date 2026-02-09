import { BaseComponents } from "~baseComponents";
import styles from "./AccordionTitle.module.css";

export interface IAccordionTitleProps {
  title: string;
}

export const AccordionTitle = ({ title }: IAccordionTitleProps) => (
  <BaseComponents.Typography
    aria-label={title}
    className={styles.title}
    data-testid="Accordion_TITLE"
    fontClass="body1Medium"
    tag="span"
  >
    {title}
  </BaseComponents.Typography>
);
