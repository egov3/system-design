import { AituIcon } from "@egov3/graphics/Logo/Aitu";
import { InstagramIcon } from "@egov3/graphics/Logo/Instagram";

export const socialCardItems = [
  {
    icon: <InstagramIcon />,
    title: "instagram",
    handleOrderService: () => {
      console.log("instagram");
    },
  },
  {
    icon: <AituIcon />,
    title: "aitu",
    handleOrderService: () => {
      console.log("aitu");
    },
  },
];
