import { CityIcon } from "@egov3/graphics/General/City";
import { RealEstateIcon } from "@egov3/graphics/General/RealEstate";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ServiceCardComponent } from "~components";

const category = {
  icon: <CityIcon />,
};

const subcategory = {
  icon: <RealEstateIcon />,
};

const meta = {
  title: "Components/Services/ServiceCardComponent",
  component: ServiceCardComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "mobile"],
    },
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    isNew: {
      control: { type: "boolean" },
    },
  },
  args: {
    handleOrderService: () => {},
    isNew: false,
    variant: "default",
    direction: "vertical",
    badge: {
      category,
      subcategory,
    },
    title: "Заголовок карточки",
  },
} satisfies Meta<typeof ServiceCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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

export const NotCategoryIcon: Story = {
  args: {
    badge: {
      subcategory,
    },
  },
};

export const NotSubcategoryIcon: Story = {
  args: {
    badge: {
      category,
    },
  },
};

export const Mobile: Story = {
  args: {
    variant: "mobile",
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    badge: {
      subcategory,
    },
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
};
