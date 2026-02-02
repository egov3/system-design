import { BaseComponents } from "~baseComponents";
import styles from "./HelpInstruction.module.css";

export interface IHelpInstructionProps {
  description: string;
  linkText: string;
  link: string;
}

export const HelpInstruction = ({
  description,
  linkText,
  link,
}: IHelpInstructionProps) => (
  <div className={styles.wrap} data-testid="HelpInstruction_WRAP">
    <BaseComponents.Typography
      aria-label={description}
      data-testid="HelpInstruction_DESCRIPTION"
      fontClass="caption1Regular"
      tag="span"
    >
      {description}
    </BaseComponents.Typography>
    <BaseComponents.Typography
      aria-label={linkText}
      data-testid="HelpInstructionLink_TEXT"
      fontClass="caption1Regular"
      tag="span"
    >
      <a
        className={styles.link}
        data-testid="HelpInstruction_LINK"
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {linkText}
      </a>
    </BaseComponents.Typography>
  </div>
);
