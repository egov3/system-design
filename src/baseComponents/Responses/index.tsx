import { DocFilledIcon } from "@egov3/graphics/General/DocFilled";
import type { MouseEventHandler } from "react";
import { Button } from "../Button";
import { StatusText } from "../StatusText";
import { Typography } from "../Typography";
import styles from "./Responses.module.css";

export interface IResponsesProps {
  label?: string;
  text?: string;
  textType?: "ERROR" | "INFO" | "SUCCESS";
  documents: {
    id: string;
    name: string;
    ariaLabel: string;
    fileType: "SUCCESS" | "ERROR";
    hint?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    isDisabled: boolean;
  }[];
}

const documentIconColors = {
  ERROR: "var(--icon-error-color)",
  SUCCESS: "var(--icon-accent-color)",
};

export const Responses = ({
  label,
  text,
  textType = "INFO",
  documents,
}: IResponsesProps) => {
  return (
    <div className={styles.response} data-testid="Responses_WRAP">
      {label && (
        <Typography
          tag="span"
          fontClass="caption1Regular"
          className={styles.label}
          data-testid="Responses_LABEL"
        >
          {label}
        </Typography>
      )}
      {documents.length > 0 && (
        <div className={styles.documents} data-testid="Responses_DOCUMENTS">
          {documents.map(
            ({ id, name, ariaLabel, fileType, hint, onClick, isDisabled }) => (
              <div
                key={id}
                className={styles.documentItem}
                data-testid="Responses_DOC_WRAPPER"
              >
                <Button
                  size="mini"
                  variant={fileType === "SUCCESS" ? "tinted" : "tinted-red"}
                  className={styles.document}
                  onClick={onClick}
                  disabled={isDisabled}
                  aria-label={ariaLabel}
                  data-testid="Responses_DOCUMENT"
                >
                  <DocFilledIcon
                    className={styles.documentIcon}
                    fill={documentIconColors[fileType]}
                    aria-hidden="true"
                  />
                  <Typography
                    tag="span"
                    fontClass="caption1Medium"
                    data-testid="Responses_DOCNAME"
                    className={styles.documentName}
                  >
                    {name}
                  </Typography>
                </Button>

                {hint && (
                  <Typography
                    tag="span"
                    fontClass="caption1Regular"
                    className={styles.documentHint}
                    data-testid="Responses_HINT"
                  >
                    {hint}
                  </Typography>
                )}
              </div>
            ),
          )}
        </div>
      )}
      {text && <StatusText text={text} isNeedIcon variant={textType} />}
    </div>
  );
};
