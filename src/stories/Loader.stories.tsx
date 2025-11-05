// src/stories/LoaderComponent.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";

const meta: Meta<typeof BaseComponents.Loader> = {
  title: "Loader",
  component: BaseComponents.Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    open: true,
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <div style={{ width: "100px", height: "100px" }}>
      <BaseComponents.Loader {...args} />
    </div>
  ),
};

export const Hidden: Story = {
  args: {
    open: false,
  },
  render: (args) => (
    <div style={{ width: "100px", height: "100px" }}>
      <BaseComponents.Loader {...args} />
    </div>
  ),
};
