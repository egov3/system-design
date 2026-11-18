import { AttachFileAddIcon } from "@egov3/graphics/Additional/AttachFileAdd";
import { useRef, useState, type ChangeEvent } from "react";

import { ILangGeneric } from "~interfaces/common";

import { Button } from "../../baseComponents/Button";
import { Typography } from "../../baseComponents/Typography";
import { FileForUpload, type IUploadedFile } from "../Services/FileForUpload";
import styles from "./UploadFile.module.css";

export interface IUploadFileProps {
  files: IUploadedFile[];
  label: string;
  lang: keyof ILangGeneric<string>;
  accept?: string;
  isMultiple?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSelect: (files: File[]) => void | Promise<void>;
  onRemove: (id: string, fileId?: string) => void;
}

export const UploadFile = ({
  files,
  label,
  lang,
  accept,
  isMultiple = false,
  isDisabled = false,
  isLoading = false,
  onSelect,
  onRemove,
}: IUploadFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selecting, setSelecting] = useState(false);
  const isDisabledValue = isDisabled || isLoading || selecting;
  const canShowAddButton = isMultiple || files.length === 0;
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (!selectedFiles.length || isDisabledValue) return;
    setSelecting(true);
    try {
      await onSelect(isMultiple ? selectedFiles : selectedFiles.slice(0, 1));
    } finally {
      setSelecting(false);
    }
  };
  return (
    <div className={styles.wrapper} data-testid="UPLOAD_FILE_WRAPPER">
      {files.length > 0 && (
        <div className={styles.fileList} data-testid="UPLOAD_FILE_LIST">
          {files.map((file) => (
            <FileForUpload
              key={file.id}
              lang={lang}
              uploadingFile={file}
              handleRemoveFile={() => {
                if (!isDisabledValue) onRemove(file.id, file.fileId);
              }}
            />
          ))}
        </div>
      )}
      {canShowAddButton && (
        <Button
          type="button"
          data-testid="UPLOAD_BUTTON_FILE"
          size="small"
          variant="tinted"
          disabled={isDisabledValue}
          onClick={() => inputRef.current?.click()}
          aria-label={label}
        >
          <AttachFileAddIcon
            data-testid="ATTACH_FILE_ICON"
            width={20}
            height={20}
            fill="var(--icon-accent-color)"
            aria-hidden="true"
          />
          <Typography
            data-testid="UPLOAD_BUTTON_LABEL"
            tag="span"
            fontClass="body2Medium"
          >
            {label}
          </Typography>
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={isMultiple}
        disabled={isDisabledValue || !canShowAddButton}
        onChange={handleChange}
        className={styles.fileInput}
      />
    </div>
  );
};
