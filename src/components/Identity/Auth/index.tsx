import { Icons } from "@egov3/graphics";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";
import type { ILangProps } from "~interfaces/common";
import { QrCodeIcon } from "~svg";
import styles from "./Auth.module.css";

export interface IAuthStepProps extends ILangProps {
  handleEdsClick: () => Promise<void>;
  handleRegistrationClick: () => void;
  handleDownloadAppClick: () => void;
}

export const Auth = ({
  lang,
  handleEdsClick,
  handleRegistrationClick,
  handleDownloadAppClick,
}: IAuthStepProps) => {
  const langDic = i18n.Auth;

  return (
    <>
      <div data-testid="AuthStepComponentLogin_BOX" className={styles.loginBox}>
        <BaseComponents.Typography
          data-testid="AuthStepComponentLoginBox_TITLE"
          className={styles.loginBox__title}
          fontClass="heading3"
          tag="h2"
          aria-label={langDic.Welcome[lang]}
        >
          {langDic.Welcome[lang]}
        </BaseComponents.Typography>
        <BaseComponents.Typography
          data-testid="AuthStepComponentNotRegisteredYet_TEXT"
          className={styles.loginBox__subtitle}
          fontClass="body2Regular"
          tag="p"
          aria-label={langDic.NotRegisteredYet[lang]}
        >
          {langDic.NotRegisteredYet[lang]}{" "}
          <button
            type="button"
            className={styles.mainRegisterBtn}
            data-testid="AuthStepComponent_REGISTRATION"
            onClick={handleRegistrationClick}
          >
            {langDic.Register[lang]}
          </button>
        </BaseComponents.Typography>
      </div>
      <div data-testid="AuthStepComponent_WRAPPER">
        <div
          data-testid="AuthStepComponent_CONTENT"
          className={styles.loginBox__content}
        >
          <ul
            data-testid="AuthStepComponentLoginBox_LIST"
            className={styles.loginBox__textItemsList}
          >
            <li
              data-testid="AuthStepComponentLoginBoxPhone_ITEM"
              className={styles.loginBox__textItemWrapper}
            >
              <div data-testid="AuthStepComponentLoginBoxPhone_ICON">
                <Icons.General.Phone
                  data-testid="AuthStepComponentPhone_ICON"
                  width={16}
                  height={16}
                />
              </div>
              <BaseComponents.Typography
                data-testid="AuthStepComponentLoginBox_INFO"
                tag="span"
                fontClass="caption1Regular"
                aria-label={langDic.OpenAppEgov[lang]}
              >
                {langDic.OpenAppEgov[lang]}
                <button
                  type="button"
                  data-testid="AuthStepComponentLoginBox_LINK"
                  aria-label={langDic.DownloadApp[lang]}
                  className={styles.downloadBtn}
                  onClick={handleDownloadAppClick}
                >
                  {langDic.DownloadApp[lang]}
                </button>
              </BaseComponents.Typography>
            </li>
            <li
              data-testid="AuthStepComponentLoginBoxQR_ITEM"
              className={styles.loginBox__textItemWrapper}
            >
              <div data-testid="AuthStepComponentLoginBoxQR_ICON">
                <Icons.General.QrCodeOutline
                  data-testid="AuthStepComponentQRCodeOutline_ICON"
                  width={16}
                  height={16}
                />
              </div>
              <BaseComponents.Typography
                data-testid="AuthStepComponentLoginBoxClickQr_INFO"
                tag="span"
                fontClass="caption1Regular"
                aria-label={langDic.ClickQRIcon[lang]}
              >
                {langDic.ClickQRIcon[lang]}
              </BaseComponents.Typography>
            </li>
            <li
              data-testid="AuthStepComponentLoginBoxQRScan_ITEM"
              className={styles.loginBox__textItemWrapper}
            >
              <div data-testid="AuthStepComponentLoginBoxQRScan_ICON">
                <Icons.General.QrCodeScan
                  data-testid="AuthStepComponentQrCodeScan_ICON"
                  width={16}
                  height={16}
                />
              </div>
              <BaseComponents.Typography
                data-testid="AuthStepComponentLoginBoxScanQRIcon_INFO"
                tag="span"
                fontClass="caption1Regular"
                aria-label={langDic.ScanQRIcon[lang]}
              >
                {langDic.ScanQRIcon[lang]}
              </BaseComponents.Typography>
            </li>
          </ul>
          <div
            data-testid="AuthStepComponentLoginBoxQr_CODE"
            className={styles.loginBox__qrCode}
          >
            <QrCodeIcon
              data-testid="AuthStepComponentQrCode_ICON"
              className={styles.svg}
            />
          </div>
        </div>
      </div>
      <div
        data-testid="AuthStepComponentLoginBox_DIVIDER"
        className={styles.loginBox__divider}
      >
        <BaseComponents.Typography
          data-testid="AuthStepComponentLoginBoxText_DIVIDER"
          className={styles.loginBox__dividerText}
          fontClass="body2Regular"
          tag="span"
          aria-label={langDic.UseAnotherMethod[lang]}
        >
          {langDic.UseAnotherMethod[lang]}
        </BaseComponents.Typography>
      </div>
      <div
        data-testid="AuthStepComponentLoginBox_FOOTER"
        className={styles.loginBox__footer}
      >
        <BaseComponents.Button
          data-testid="IdentityAuthBtn_EDS"
          aria-label={langDic.AriaEDS[lang]}
          variant="tinted"
          size="large"
          onClick={handleEdsClick}
        >
          {langDic.EDS[lang]}
        </BaseComponents.Button>
      </div>
    </>
  );
};
