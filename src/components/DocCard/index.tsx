import type React from "react";
import type { Dispatch, JSX } from "react";
import type { ILangProps } from "~interfaces/common";
import { Modal } from "../../baseComponents/Modal";
import { Typography } from "../../baseComponents/Typography";
import styles from "./DocCard.module.css";

export interface IDocCardProps extends ILangProps {
  title: string;
  docIcon: JSX.Element;
  expiration?: string;
  children?: React.ReactNode;
  showModal?: boolean;
  setShowModal?: Dispatch<React.SetStateAction<boolean>>;
}

export const DocCard = ({
  title,
  docIcon,
  expiration,
  showModal,
  setShowModal,
  children,
  lang,
}: IDocCardProps) => {
  return (
    <>
      <button
        type="button"
        data-testid="DocCard_BUTTON"
        onClick={() => setShowModal?.(!showModal)}
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
      {showModal && (
        <Modal
          open={showModal}
          setOpen={setShowModal}
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
