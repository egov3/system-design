import { CityIcon } from "@egov3/graphics/General/City";
import { RealEstateIcon } from "@egov3/graphics/General/RealEstate";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ServiceCardComponent } from "~components";

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
    badge: {
      category: {
        icon: <CityIcon />,
      },
      subcategory: {
        icon: <RealEstateIcon />,
      },
    },
    title: "Заголовок карточки",
  },
} satisfies Meta<typeof ServiceCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsNew: Story = {
  args: {
    isNew: true,
  },
};

export const CategoryIcon: Story = {
  args: {
    isNew: false,
  },
};

export const NotSubcategoryIcon: Story = {
  args: {
    isNew: false,
    badge: {
      category: {
        icon: <CityIcon />,
      },
    },
  },
};
