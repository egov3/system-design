import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta = {
  title: "Components/ServiceCardComponent",
  component: Components.ServiceCardComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    handleOrderService: () => {},
    badge: {
      category: {
        icon: <Icons.General.City />,
      },
      subcategory: {
        icon: <Icons.General.RealEstate />,
      },
    },
    title: "Заголовок карточки",
  },
} satisfies Meta<typeof Components.ServiceCardComponent>;

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
        icon: <Icons.General.City />,
      },
    },
  },
};
