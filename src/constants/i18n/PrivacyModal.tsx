import enPolicy from "./privacyPolicy/en.html";
import kkPolicy from "./privacyPolicy/kk.html";
import ruPolicy from "./privacyPolicy/ru.html";

export const PrivacyModal = {
  title: {
    ru: "Политика конфиденциальности",
    kk: "Құпиялық саясаты",
    en: "Privacy Policy",
  },
  privacyAgreementText: {
    ru: ruPolicy,
    kk: kkPolicy,
    en: enPolicy,
  },
};
