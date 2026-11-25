import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { EgovInfoIcon } from "@egov3/graphics/Illustrations/EgovInfoIcon";
import { fn } from "storybook/test";

import { ConfirmationContent } from "~components";

import { CardWrapperItem } from "../CardWrapperItem";
const meta: Meta<typeof ConfirmationContent> = {
  title: "Components/ConfirmationContent",
  component: ConfirmationContent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    illustration: <EgovInfoIcon />,
    title: "Вы уверены, что хотите перейти на получение услуги",
    description:
      "“Актуализация (корректировка) сведений о детях, браке, перемене ФИО и смерти”",
    footerButtons: [
      { text: "Да, перейти", onClick: fn() },
      { text: "Отмена", onClick: fn(), variant: "secondary" },
    ],
  },
  argTypes: {
    illustration: { control: false },
    title: { control: "text" },
    description: { control: "text" },
    footerButtons: { control: "object" },
    variant: { control: "select", options: ["default", "mobile"] },
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          backgroundColor: "var(--page-color-background-white)",
          width: "400px",
        }}
      >
        <ConfirmationContent {...args} />
      </div>
    </CardWrapperItem>
  ),
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Mobile: Story = {
  args: { variant: "mobile" },
};
