import type React from "react";
import { type JSX, useState } from "react";
import type { ILangProps } from "~interfaces/common";
import { Modal } from "../../baseComponents/Modal";
import { Typography } from "../../baseComponents/Typography";
import styles from "./DocCard.module.css";

export interface IDocCardProps extends ILangProps {
  title: string;
  docIcon: JSX.Element;
  expiration?: string;
  children?: React.ReactNode;
}

export const DocCard = ({
  title,
  docIcon,
  expiration,
  children,
  lang,
}: IDocCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-testid="DocCard_BUTTON"
        onClick={() => setIsModalOpen(!isModalOpen)}
        className={styles.container}
        aria-label={title}
      >
        <div data-testid="DocCard_CARD" className={styles.card}>
          <div data-testid="DocCard_DOCUMENT" className={styles.document}>
            {docIcon}
          </div>
        </div>
        <div data-testid="DocCard_TEXT" className={styles.text}>
          <Typography
            tag="span"
            fontClass="caption1Medium"
            data-testid="DocCard_TITLE"
            className={styles.title}
          >
            {title}
          </Typography>
          {expiration && (
            <Typography
              tag="span"
              data-testid="DocCard_EXPIRATION"
              className={styles.expiration}
              aria-label={expiration}
              fontClass="caption1Regular"
            >
              {expiration}
            </Typography>
          )}
        </div>
      </button>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          header={{ title, isClosable: true }}
          variant="small"
          lang={lang}
        >
          {children}
        </Modal>
      )}
    </>
  );
};
