import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta = {
  title: "Components/Calendar/Calendar",
  component: Components.Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Components.Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
