import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";

const meta: Meta<typeof Components.IconToggleItem> = {
  title: "Components/Profile/IconToggleItem",
  component: Components.IconToggleItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    Icon: Icons.Logo.Kaspi,
    text: "Kaspi Bank",
    lock: false,
  },
  argTypes: {
    text: {
      control: { type: "text" },
    },
    lock: {
      control: { type: "boolean" },
    },
    unlock: {
      action: "unlock",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Locked: Story = {
  args: {
    lock: true,
  },
};

export const HalykBank: Story = {
  args: {
    Icon: Icons.Logo.Halyk,
    text: "Halyk Bank",
  },
};

export const Interactive: Story = {
  render: (args) => {
    const InteractiveComponent = () => {
      const [lock, setLock] = useState(false);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Components.IconToggleItem {...args} lock={lock} unlock={setLock} />
          <div
            style={{
              textAlign: "center",
            }}
          >
            {lock ? "Locked" : "Unlocked"}
          </div>
        </div>
      );
    };
    return <InteractiveComponent />;
  },
  args: {
    Icon: Icons.Logo.Kaspi,
    text: "Kaspi Bank",
  },
};
