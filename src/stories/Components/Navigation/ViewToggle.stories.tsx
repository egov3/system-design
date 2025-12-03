import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Navigation/ViewToggle",
  component: Components.ViewToggle,
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
    setActiveView: fn(),
  },
} satisfies Meta<typeof Components.ViewToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeView: "serviceCardList",
  },
};
