import type { ILangProps, IRouterClosure } from "~interfaces/common";
import { IdentityHeader } from "../IdentityHeader";
import styles from "./IdentityModal.module.css";

export interface IIdentityModalProps extends ILangProps {
  children: React.ReactNode;
  goBackService(): void;
  isMain: boolean;
  navigator: (closure: IRouterClosure) => () => void;
}

export const IdentityModal = ({
  children,
  goBackService,
  isMain,
  lang,
  navigator,
}: IIdentityModalProps) => {
  const goMainClosure = {
    primary: { owner: "IdentityModal", route: "/" },
    secondary: { owner: "IdentityModal", route: "identity/main/" },
  };

  return (
    <div className={styles.wrapper} data-testid="IdentityModule_WRAPPER">
      <div className={styles.loginBox} data-testid="IdentityModule_LOGIN_BOX">
        {!isMain && (
          <IdentityHeader.Secondary
            goIdentityMain={navigator(goMainClosure.secondary)}
            goBackService={goBackService}
            lang={lang}
          />
        )}
        <div
          className={styles.loginBody}
          data-testid="IdentityModule_LOGIN_BODY"
        >
          {isMain && (
            <IdentityHeader.Primary
              goMainPage={navigator(goMainClosure.primary)}
              lang={lang}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
