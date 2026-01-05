import type React from "react";
import { type JSX, useState } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./DocCard.module.css";

export interface IDocCardProps extends ILangProps {
  title: string;
  docIcon: JSX.Element;
  expiration?: string;
  children?: React.ReactNode;
  handleDownload: () => void;
}

export const DocCard = ({
  title,
  docIcon,
  expiration,
  children,
  lang,
  handleDownload,
}: IDocCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const langDic = i18n.DocCard;
  return (
    <>
      <button
        type="button"
        data-testid="DocCard_BUTTON"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
        className={styles.container}
        aria-label={title}
      >
        <div data-testid="DocCard_CARD" className={styles.card}>
          <div data-testid="DocCard_DOCUMENT" className={styles.document}>
            {docIcon}
          </div>
        </div>
        <div data-testid="DocCard_TEXT" className={styles.text}>
          <BaseComponents.Typography
            tag="span"
            fontClass="caption1Medium"
            data-testid="DocCard_TITLE"
            className={styles.title}
          >
            {title}
          </BaseComponents.Typography>
          {expiration && (
            <BaseComponents.Typography
              tag="span"
              data-testid="DocCard_EXPIRATION"
              className={styles.expiration}
              aria-label={expiration}
              fontClass="caption1Regular"
            >
              {expiration}
            </BaseComponents.Typography>
          )}
        </div>
      </button>
      {isModalOpen && (
        <BaseComponents.Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          header={{ title, isClosable: true }}
          variant="small"
          lang={lang}
          footer={
            <BaseComponents.ModalFooterButton
              buttonList={[
                {
                  text: langDic.downloadButton[lang],
                  onClick: handleDownload,
                  dataTestid: "DocDetails_BUTTON",
                },
              ]}
            />
          }
        >
          {children}
        </BaseComponents.Modal>
      )}
    </>
  );
};
