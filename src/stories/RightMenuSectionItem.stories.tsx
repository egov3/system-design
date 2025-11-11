import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import type { TButtonVariant } from "~interfaces/Button";

const meta: Meta<typeof Components.RightMenuSectionItem> = {
  title: "RightMenuSectionItem",
  component: Components.RightMenuSectionItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
    },
    btnText: {
      control: "text",
    },
    ariaLabel: {
      control: "text",
    },
    btnVariant: {
      control: "select",
      options: ["default", "secondary"] satisfies TButtonVariant[],
    },
    btnOnClick: {
      action: "clicked",
    },
  },
  args: {
    title:
      "Если нашли неверную информацию, просим сообщить нам нажав на кнопку ниже",
    btnText: "Сообщить об ошибке",
    ariaLabel: "Кнопка Сообщить об ошибке",
    btnVariant: "secondary",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultVariantButton: Story = {
  args: {
    btnVariant: "default",
    btnText: "Настроить доступы",
    title: "Ваши документы доступны в сервисах от Kaspi, Halyk",
  },
};

export const SecondaryVariantButton: Story = {
  args: {
    btnVariant: "secondary",
    btnText: "Настроить доступы",
    title: "Ваши документы доступны в сервисах от Kaspi, Halyk",
  },
};

export const WithoutTitle: Story = {
  args: {
    btnVariant: "default",
    btnText: "Настроики профиля",
    title: "",
  },
};
