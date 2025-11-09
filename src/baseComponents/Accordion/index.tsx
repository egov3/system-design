// src/baseComponents/Accordion/index.tsx
import type { Dispatch, JSX } from "react";
import { joinClasses } from "~utils/joinClasses";
import styles from "./Accordion.module.css";

export interface IAccordionProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: JSX.Element;
}

export const Accordion = ({
  open,
  setOpen,
  children,
  title,
}: IAccordionProps) => (
  <>
    <button
      type="button"
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
          transform: open ? "rotate(0.5turn)" : "none",
        }}
      >
        <path
          d="M9.99998 15.1933L2.45746 7.65162L3.63579 6.47329L9.99998 12.8366L16.3641 6.47329L17.5425 7.65162L9.99998 15.1933Z"
          fill="#758393"
        />
      </svg>
    </button>
    <div
      data-testid="Accordion_CONTENT"
      className={joinClasses(
        styles.accordionContent,
        !open && styles[`accordionContent--hidden`],
      )}
    >
      {children}
    </div>
  </>
);
