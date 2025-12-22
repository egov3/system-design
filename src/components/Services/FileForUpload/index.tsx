import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { joinClasses } from "~utils/joinClasses";
import styles from "./FileForUpload.module.css";

export interface IUploadedFile {
  file: File;
  fileId: string;
  isLoading: boolean;
  isError: boolean;
}

type FileState = "error" | "downloading" | "success";

export interface IFileForUploadProps extends ILangProps {
  uploadingFile: IUploadedFile;
  handleRemoveFile: (fileName: string) => void;
}

const langDic = i18n.FileUpload;

const textStyle = (state: FileState) => {
  switch (state) {
    case "error":
      return styles.downloadErrorText;
    case "downloading":
      return styles.downloadingText;
    case "success":
      return styles.downloadSuccessText;
  }
};

const FileNameWithExtension = ({
  Filename,
  state,
}: {
  Filename: string;
  state: FileState;
}) => {
  const lastDotIndex = Filename.lastIndexOf(".");
  const name = Filename.slice(0, lastDotIndex);
  const extension = Filename.slice(lastDotIndex + 1);

  return (
    <div className={styles.fileNameContainer}>
      <BaseComponents.Typography
        tag="span"
        fontClass="body2Regular"
        className={joinClasses(styles.textOverflow, textStyle(state))}
        aria-label={name}
        data-testid="UploadFileBlock_DOC_LOAD"
      >
        {name}
      </BaseComponents.Typography>
      <BaseComponents.Typography
        tag="span"
        fontClass="body2Regular"
        className={textStyle(state)}
        aria-label={`.${extension}`}
        data-testid="UploadFileBlock_DOC_LOAD"
      >
        {`.${extension}`}
      </BaseComponents.Typography>
    </div>
  );
};

const UploadingFile = ({
  lang,
  uploadingFile,
  handleRemoveFile,
}: IFileForUploadProps) => (
  <div className={styles.downloadFile} data-testid="UploadFileBlock_FILE">
    <Icons.General.Loader
      data-testid="UploadFileBlock_LOADER_ICON"
      aria-label={langDic.loaderIconLabel[lang]}
      className={styles.downloadingIcon}
    />
    <FileNameWithExtension
      Filename={uploadingFile.file.name}
      state="downloading"
    />
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
}: IFileForUploadProps) => (
  <div className={styles.downloadFile} data-testid="UploadFileBlock_FILE">
    <Icons.General.Error
      data-testid="UploadFileBlock_ERROR_ICON"
      aria-label={langDic.ErrorIconLabel[lang]}
      className={styles.downloadErrorIcon}
    />
    <FileNameWithExtension Filename={uploadingFile.file.name} state="error" />
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
}: IFileForUploadProps) => (
  <div className={styles.downloadFile} data-testid="UploadFileBlock_FILE">
    <Icons.General.Doc
      data-testid="UploadFileBlock_DOC_ICON"
      aria-label={langDic.DocIconLabel[lang]}
      className={styles.downloadSuccessIcon}
    />
    <FileNameWithExtension Filename={uploadingFile.file.name} state="success" />
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
}: IFileForUploadProps) => {
  if (uploadingFile.isError) {
    return (
      <UploadingFileError
        uploadingFile={uploadingFile}
        lang={lang}
        handleRemoveFile={handleRemoveFile}
      />
    );
  } else if (uploadingFile.isLoading) {
    return (
      <UploadingFile
        uploadingFile={uploadingFile}
        lang={lang}
        handleRemoveFile={handleRemoveFile}
      />
    );
  } else {
    return (
      <UploadedFileSuccess
        uploadingFile={uploadingFile}
        lang={lang}
        handleRemoveFile={handleRemoveFile}
      />
    );
  }
};
