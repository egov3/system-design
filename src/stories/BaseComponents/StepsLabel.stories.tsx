import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { StepsLabel } from "src/baseComponents/StepsLabel";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/StepsLabel",
  component: StepsLabel,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "var(--page-color-background-white)", width: "600px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    label: "Данные заявителя",
  },
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<typeof StepsLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: {
    label:
      "Выбор социального счёта для перечисления пособия на оплату жилищной помощи",
  },
};
