import React, { Dispatch } from "react";

import styles from "./Accordion.module.css";
import { joinClasses } from "~utils/joinClasses";

export interface IAccordionProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: React.JSX.Element;
}

export const Accordion = ({
  open,
  setOpen,
  children,
  title,
}: IAccordionProps) => {
  return (
    <>
      <button
        data-testid="Accordion_BUTTON"
        className={styles.accordionBtn}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {title}
        <svg
          data-testid="Accordion_DIRECTION"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            transform: !open ? "none" : "rotate(0.5turn)",
          }}
        >
          <path d="M15.8346 7.5L10.0013 13.3333L4.16797 7.5" stroke="#758393" />
        </svg>
      </button>
      <div
        data-testid="Accordion_CONTENT"
        className={joinClasses(
          styles.accordionContent,
          !open && styles[`accordionContent--hidden`]
        )}
      >
        {children}
      </div>
    </>
  );
};
