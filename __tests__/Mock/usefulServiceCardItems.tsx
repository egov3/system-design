import { ELicenseIcon } from "@egov3/graphics/Logo/ELicense";
import { SmartBridgeIcon } from "@egov3/graphics/Logo/SmartBridgeIcon";

export const usefulServiceCardItems = [
  {
    icon: <ELicenseIcon />,
    title: "E-license",
    label: "Информационная система автоматизации процессов лицензирования",
    handleOrderService: () => {
      console.log("E-license");
    },
  },
  {
    icon: <SmartBridgeIcon />,
    title: "Smart Bridge",
    label: "Интеграция между информационными системами госструктур и бизнеса",
    handleOrderService: () => {
      console.log("Smart Bridge");
    },
  },
];
