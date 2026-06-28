import { HalykIcon } from "@egov3/graphics/Logo/Halyk";
import { KaspiIcon } from "@egov3/graphics/Logo/Kaspi";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { IconToggleItem } from "~components";

const meta: Meta<typeof IconToggleItem> = {
  title: "Components/Profile/IconToggleItem",
  component: IconToggleItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    Icon: KaspiIcon,
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
    Icon: HalykIcon,
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
          <IconToggleItem {...args} lock={lock} unlock={setLock} />
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
    Icon: KaspiIcon,
    text: "Kaspi Bank",
  },
};
