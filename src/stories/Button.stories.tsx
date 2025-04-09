// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";
import Icons from "@egov3/graphics";
import React from "react";

const meta = {
  title: "Button",
  component: Components.Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Components.Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsRounded: Story = {
  args: {
    isRounded: true,
    size: "large",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const NotRounded: Story = {
  args: {
    isRounded: false,
    size: "large",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const Mini: Story = {
  args: {
    size: "mini",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const VariantDefault: Story = {
  args: {
    variant: "default",
    size: "large",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const VariantTinted: Story = {
  args: {
    variant: "tinted",
    size: "large",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const VariantSecondary: Story = {
  args: {
    variant: "secondary",
    size: "large",
    children: "Button",
    ariaLabel: "Кпнока",
  },
};

export const VariantDefaultDisabled: Story = {
  args: {
    variant: "default",
    size: "large",
    children: "Button",
    disabled: true,
    ariaLabel: "Кпнока",
  },
};

export const VariantTintedDisabled: Story = {
  args: {
    variant: "tinted",
    size: "large",
    children: "Button",
    disabled: true,
    ariaLabel: "Кпнока",
  },
};

export const VariantSecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    size: "large",
    children: "Button",
    disabled: true,
    ariaLabel: "Кпнока",
  },
};

export const VariantIsIcon = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <Components.Button
          variant="default"
          size="mini"
          disabled={false}
          ariaLabel="Кнопка"
          isIcon={true}
        >
          <Icons.Additional.SettingsOutline
            width={16}
            height={16}
            fill="#fff"
          />
        </Components.Button>
      </div>
    </CardWrapperItem>
  );
};

export const VariantIsIconRounded = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <Components.Button
          variant="default"
          size="large"
          disabled={false}
          ariaLabel="Кнопка"
          isIcon={true}
          isRounded={true}
        >
          <Icons.Additional.SettingsOutline
            width={24}
            height={24}
            fill="#fff"
          />
        </Components.Button>
      </div>
    </CardWrapperItem>
  );
};
