import DOMPurify from "dompurify";
import parse from "html-react-parser";

import styles from "./HtmlContainer.module.css";

export interface IHtmlContainerProps {
  html: string;
}

export const HtmlContainer = ({ html }: IHtmlContainerProps) => (
  <div data-testid="HtmlContainer_WRAPPER" className={styles.wrapper}>
    {parse(DOMPurify.sanitize(html))}
  </div>
);
