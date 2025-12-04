import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../../baseComponents";

const meta = {
  title: "BaseComponents/Label",
  component: BaseComponents.Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    variant: "big",
    isSpaced: false,
    text: "Label",
    Icon: Icons.General.Close,
  },
  argTypes: {
    variant: { control: "select", options: ["big", "small", "tiny"] },
    isSpaced: { control: "boolean" },
    text: { control: "text" },
    Icon: { control: "object" },
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: "bisque",
        width: "200px",
      }}
    >
      <BaseComponents.Label {...args} />
    </div>
  ),
} satisfies Meta<typeof BaseComponents.Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BigVariant: Story = {
  args: {
    variant: "big",
  },
};

export const SmallVariant: Story = {
  args: {
    variant: "small",
  },
};

export const TinyVariant: Story = {
  args: {
    variant: "tiny",
  },
};

export const Spaced: Story = {
  args: {
    variant: "big",
    isSpaced: true,
  },
};

export const BigVariantWithIcon: Story = {
  args: {
    variant: "big",
    Icon: Icons.General.Close,
  },
};

export const SmallVariantWithIcon: Story = {
  args: {
    variant: "small",
    Icon: Icons.General.Close,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const InteractiveComponent = () => {
      const [pressed, setPressed] = useState(false);
      return (
        <div
          style={{
            backgroundColor: "bisque",
            width: "250px",
          }}
        >
          <BaseComponents.Label
            {...args}
            onAction={() => {
              setPressed((val) => !val);
            }}
            text={`Button has ${pressed ? "" : "not"} pressed`}
          />
        </div>
      );
    };
    return <InteractiveComponent />;
  },
  args: {
    variant: "big",
    isSpaced: true,
    text: "Label",
    Icon: Icons.General.Close,
  },
};
