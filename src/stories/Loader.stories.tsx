// src/stories/LoaderComponent.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Loader } from "../baseComponents/Loader";

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
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
      description: "Отображать ли компонент загрузки",
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
      <Loader {...args} />
    </div>
  )
};

export const Hidden: Story = {
  args: {
    open: false,
  },
  render: (args) => (
    <div style={{ width: "100px", height: "100px" }}>
      <Loader {...args} />
    </div>
  )
};
