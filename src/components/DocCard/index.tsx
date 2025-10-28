"use client";

import { type JSX, useState } from "react";
import { Modal } from "../Modal";
import { Typography } from "../Typography";
import styles from "./DocCard.module.css";

interface IDocCardProps {
  title: string;
  docIcon: JSX.Element;
  expiration?: string;
  children: React.ReactNode;
}

export const DocCard = ({
  title,
  docIcon,
  expiration,
  children,
}: IDocCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        data-testid="DocCard_BUTTON"
        onClick={() => setShowModal(!showModal)}
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
      <Modal
        open={showModal}
        setOpen={setShowModal}
        headerTitle={title}
        variant="small"
      >
        {children}
      </Modal>
    </>
  );
};
