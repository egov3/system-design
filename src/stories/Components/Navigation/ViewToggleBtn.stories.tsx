import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Navigation/ViewToggleBtn",
  component: Components.ViewToggleBtn,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    viewType: "serviceCardList",
    setActiveView: fn(),
    Icon: Icons.General.ViewList,
  },
} satisfies Meta<typeof Components.ViewToggleBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    activeView: "serviceCardList",
  },
};

export const Inactive: Story = {
  args: {
    activeView: "serviceCardGrid",
  },
};
