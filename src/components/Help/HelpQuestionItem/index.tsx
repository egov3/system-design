import type { ReactNode } from "react";

import { AddIcon } from "@egov3/graphics/General/Add";
import { ReduceIcon } from "@egov3/graphics/General/Reduce";

import { Typography } from "~baseComponents";

import styles from "./HelpQuestionItem.module.css";

export interface IHelpQuestionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export const HelpQuestionItem = ({
  title,
  isOpen,
  onToggle,
  children,
}: IHelpQuestionItemProps) => (
  <div data-testid="HelpQuestionItem_WRAPPER">
    <button
      aria-expanded={isOpen}
      aria-label={title}
      className={styles.cell}
      data-testid="HelpQuestionItem_BUTTON"
      onClick={onToggle}
      type="button"
    >
      <Typography
        data-testid="HelpQuestionItem_TITLE"
        fontClass="body1Regular"
        tag="span"
      >
        {title}
      </Typography>
      {isOpen ? (
        <ReduceIcon
          className={styles.icon}
          data-testid="HelpQuestionItem_ICON_OPEN"
        />
      ) : (
        <AddIcon
          className={styles.icon}
          data-testid="HelpQuestionItem_ICON_CLOSED"
        />
      )}
    </button>
    {isOpen && children}
  </div>
);
