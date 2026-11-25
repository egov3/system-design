import type { JSX } from "react";

import { joinClasses } from "~utils/joinClasses";

import { Button } from "../../baseComponents/Button";
import { IFooterButtonsItem } from "../../baseComponents/Modal";
import { Title } from "../../baseComponents/Title";
import styles from "./ConfirmationContent.module.css";
export interface IConfirmationContentProps {
  illustration: JSX.Element;
  title: string;
  description?: string;
  footerButtons?: IFooterButtonsItem[];
  variant?: "default" | "mobile";
}

const EMPTY_FOOTER_BUTTONS: IFooterButtonsItem[] = [];
export const ConfirmationContent = ({
  illustration,
  title,
  description,
  footerButtons = EMPTY_FOOTER_BUTTONS,
  variant = "default",
}: IConfirmationContentProps) => {
  const isMobile = variant === "mobile";

  return (
    <div className={styles.wrapper} data-testid="ConfirmationContent_WRAPPER">
      <div
        className={joinClasses(styles.illustration, isMobile && styles.mobile)}
        data-testid="ConfirmationContent_ILLUSTRATION"
      >
        {illustration}
      </div>
      <div
        className={joinClasses(styles.content, isMobile && styles.mobile)}
        data-testid="ConfirmationContent_CONTENT"
      >
        <Title
          isCentered={true}
          title={title}
          size="medium"
          subtext={description}
        />
      </div>
      {footerButtons.length > 0 && (
        <div
          className={joinClasses(styles.buttons, isMobile && styles.mobile)}
          data-testid="ConfirmationContent_BUTTONS"
        >
          {footerButtons.map((button) => (
            <Button
              aria-label={button.text}
              data-testid={button.dataTestid}
              disabled={button.isDisabled}
              key={button.text}
              onClick={button.onClick}
              size="large"
              variant={button.variant}
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
