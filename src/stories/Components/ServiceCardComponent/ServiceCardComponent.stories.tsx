import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ServiceCardComponent } from "../../../components/ServiceCardComponent";

const meta = {
  title: "Components/ServiceCardComponent",
  component: ServiceCardComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    handleOrderService: () => {},
    lang: "ru",
    badge: {
      category: {
        icon: <Icons.General.City />,
        name: {
          ru: "",
          kk: "",
          en: "",
        },
      },
      subcategory: {
        icon: <Icons.General.RealEstate />,
        name: {
          ru: "",
          kk: "",
          en: "",
        },
      },
    },
  },
} satisfies Meta<typeof ServiceCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsNew: Story = {
  args: {
    serviceId: "P2203",
    serviceDetails: {
      categoryName: "estate.buyRent",
      id: 9,
      isNew: true,
      isPopular: true,
      link: "/services/presale/P2203",
    },
  },
};

export const CategoryIcon: Story = {
  args: {
    serviceId: "P305",
    serviceDetails: {
      categoryName: "estate.buyRent",
      id: 9,
      isNew: false,
      isPopular: true,
      link: "/services/presale/P2203",
    },
  },
};
