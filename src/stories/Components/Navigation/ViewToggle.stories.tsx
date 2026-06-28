import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { fn } from "storybook/internal/test";
import { ViewToggle } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Navigation/ViewToggle",
  component: ViewToggle,
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
  argTypes: {
    activeView: {
      control: { type: "radio" },
      options: ["serviceCardList", "serviceCardGrid"],
    },
  },
  args: {
    setActiveView: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ViewToggle>;

export default meta;

type Story = StoryObj<{
  activeView: string;
  setActiveView: (view: string) => void;
}> & {
  args?: {
    activeView?: string;
    setActiveView?: (view: string) => void;
  };
};

export const ServiceCardListView: Story = {
  args: {
    activeView: "serviceCardList",
  },
};

export const ServiceCardGridView: Story = {
  args: {
    activeView: "serviceCardGrid",
  },
};

export const Interactive: Story = {
  render: () => {
    const InteractiveComponent = () => {
      const [activeView, setActiveView] = useState("serviceCardList");

      return <ViewToggle activeView={activeView} setActiveView={setActiveView} />;
    };

    return <InteractiveComponent />;
  },
};
