import { Icons } from "@egov3/graphics";
import { useLayoutEffect, useRef, useState } from "react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import styles from "./FileForUpload.module.css";

export interface IUploadedFile {
  file: File;
  fileId: string;
  isLoading: boolean;
  isError: boolean;
}

export interface IFileForUploadProps extends ILangProps {
  uploadingFile: IUploadedFile;
  handleRemoveFile: (fileName: string) => void;
  displayName: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const langDic = i18n.FileUpload;

export const measureTextWidth = (text: string, font: string): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = font;
  return context.measureText(text).width;
};

export const truncateFileName = (
  fileName: string,
  maxLength?: number,
): string => {
  const lastDotIndex = fileName.lastIndexOf(".");
  const name = fileName.slice(0, lastDotIndex);
  const extension = fileName.slice(lastDotIndex + 1);
  const effectiveMaxLength = maxLength ?? 20;

  if (name.length <= effectiveMaxLength) {
    return fileName;
  }

  const truncatedName = `${name.slice(0, effectiveMaxLength - 3)}...`;
  return `${truncatedName}.${extension}`;
};

export const calculateDisplayName = (
  fullText: string,
  containerWidth: number,
  font: string,
): string => {
  const availableTextWidth = containerWidth - 64;
  if (availableTextWidth <= 0) {
    return truncateFileName(fullText, 0);
  }
  const fullWidth = measureTextWidth(fullText, font);
  if (fullWidth <= availableTextWidth) {
    return fullText;
  }

  let low = 0;
  let high = fullText.length;
  let best = fullText;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = truncateFileName(fullText, mid);
    const width = measureTextWidth(candidate, font);
    if (width <= availableTextWidth) {
      best = candidate;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return best;
};

const UploadingFile = ({
  lang,
  uploadingFile,
  handleRemoveFile,
  displayName,
  containerRef,
}: IFileForUploadProps) => (
  <div
    ref={containerRef}
    className={styles.downloadFile}
    data-testid="UploadFileBlock_FILE"
  >
    <Icons.General.Loader
      data-testid="UploadFileBlock_LOADER_ICON"
      aria-label={langDic.loaderIconLabel[lang]}
      className={styles.downloadingIcon}
    />
    <BaseComponents.Typography
      tag="span"
      fontClass="body2Regular"
      className={styles.downloadingText}
      aria-label={uploadingFile.file.name}
      data-testid="UploadFileBlock_DOC_LOAD"
    >
      {displayName}
    </BaseComponents.Typography>
    <Icons.General.Clear
      data-testid="UploadFileBlock_CLEAR_ICON"
      aria-label={langDic.clearIconLabel[lang]}
      onClick={() => {
        handleRemoveFile(uploadingFile.file.name);
      }}
      className={styles.downloadingClearIcon}
    />
  </div>
);

const UploadingFileError = ({
  lang,
  uploadingFile,
  handleRemoveFile,
  displayName,
  containerRef,
}: IFileForUploadProps) => (
  <div
    ref={containerRef}
    className={styles.downloadFile}
    data-testid="UploadFileBlock_FILE"
  >
    <Icons.General.Error
      data-testid="UploadFileBlock_ERROR_ICON"
      aria-label={langDic.ErrorIconLabel[lang]}
      className={styles.downloadErrorIcon}
    />
    <BaseComponents.Typography
      tag="span"
      fontClass="body2Regular"
      className={styles.downloadErrorText}
      aria-label={uploadingFile.file.name}
      data-testid="UploadFileBlock_DOC_ERROR"
    >
      {displayName}
    </BaseComponents.Typography>
    <Icons.General.Clear
      data-testid="UploadFileBlock_CLEAR_ICON"
      aria-label={langDic.clearIconLabel[lang]}
      className={styles.downloadClearIcon}
      onClick={() => {
        handleRemoveFile(uploadingFile.file.name);
      }}
    />
  </div>
);

const UploadedFileSuccess = ({
  lang,
  uploadingFile,
  handleRemoveFile,
  displayName,
  containerRef,
}: IFileForUploadProps) => (
  <div
    ref={containerRef}
    className={styles.downloadFile}
    data-testid="UploadFileBlock_FILE"
  >
    <Icons.General.Doc
      data-testid="UploadFileBlock_DOC_ICON"
      aria-label={langDic.DocIconLabel[lang]}
      className={styles.downloadSuccessIcon}
    />
    <BaseComponents.Typography
      tag="span"
      fontClass="body2Regular"
      className={styles.downloadSuccessText}
      aria-label={uploadingFile.file.name}
      data-testid="UploadFileBlock_DOC"
    >
      {displayName}
    </BaseComponents.Typography>
    <Icons.General.Clear
      data-testid="UploadFileBlock_CLEAR_ICON"
      aria-label={langDic.clearIconLabel[lang]}
      onClick={() => {
        handleRemoveFile(uploadingFile.file.name);
      }}
      className={styles.downloadClearIcon}
    />
  </div>
);

export const FileForUpload = ({
  lang,
  uploadingFile,
  handleRemoveFile,
}: Omit<IFileForUploadProps, "displayName" | "containerRef">) => {
  const [displayName, setDisplayName] = useState(
    truncateFileName(uploadingFile.file.name),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const textSpan = container.querySelector(
      'span[data-testid*="DOC"]',
    ) as HTMLSpanElement;
    if (!textSpan) return;
    const containerWidth = container.clientWidth;
    const font = getComputedStyle(textSpan).font;
    const fullText = uploadingFile.file.name;
    const newDisplayName = calculateDisplayName(fullText, containerWidth, font);
    setDisplayName(newDisplayName);
  }, [uploadingFile.file.name]);

  const props: IFileForUploadProps = {
    lang,
    uploadingFile,
    handleRemoveFile,
    displayName,
    containerRef,
  };

  if (uploadingFile.isError) {
    return <UploadingFileError {...props} />;
  } else if (uploadingFile.isLoading) {
    return <UploadingFile {...props} />;
  } else {
    return <UploadedFileSuccess {...props} />;
  }
};
