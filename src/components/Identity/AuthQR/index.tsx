import { QRIllustration } from "@egov3/graphics/Illustrations/QR";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { Button } from "../../../baseComponents/Button";
import styles from "./AuthQR.module.css";

export interface IAuthQRProps extends ILangProps {
  handleRefreshClick: () => void;
}

export const AuthQR = ({ handleRefreshClick, lang }: IAuthQRProps) => {
  const langDic = i18n.AuthQR;

  return (
    <div data-testid="QRCode_COMPONENT" className={styles.wrapper}>
      <QRIllustration className={styles.qrIllustration} />
      <Button
        onClick={handleRefreshClick}
        variant="black"
        size="small"
        data-testid="QRCodeComponent_REFRESH"
      >
        {langDic.refresh[lang]}
      </Button>
    </div>
  );
};
