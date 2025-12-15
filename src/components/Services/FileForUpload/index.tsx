import { Icons } from "@egov3/graphics";
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
}

const langDic = i18n.FileUpload;

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
    <BaseComponents.Typography
      tag="span"
      fontClass="body2Regular"
      className={styles.downloadingText}
      aria-label={uploadingFile.file.name}
      data-testid="UploadFileBlock_DOC_LOAD"
    >
      {uploadingFile.file.name}
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
}: IFileForUploadProps) => (
  <div className={styles.downloadFile} data-testid="UploadFileBlock_FILE">
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
      {uploadingFile.file.name}
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
}: IFileForUploadProps) => (
  <div className={styles.downloadFile} data-testid="UploadFileBlock_FILE">
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
      {uploadingFile.file.name}
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

export const FileForUpload = (props: IFileForUploadProps) => {
  if (props.uploadingFile.isError) {
    return UploadingFileError(props);
  } else if (props.uploadingFile.isLoading) {
    return UploadingFile(props);
  } else {
    return UploadedFileSuccess(props);
  }
};
