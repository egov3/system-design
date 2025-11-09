// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { BaseComponents } from "../baseComponents";

const meta = {
  title: "Button",
  component: BaseComponents.Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof BaseComponents.Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsRounded: Story = {
  args: {
    isRounded: true,
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const NotRounded: Story = {
  args: {
    isRounded: false,
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const Mini: Story = {
  args: {
    size: "mini",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const VariantDefault: Story = {
  args: {
    variant: "default",
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const VariantTinted: Story = {
  args: {
    variant: "tinted",
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const VariantSecondary: Story = {
  args: {
    variant: "secondary",
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const VariantBlack: Story = {
  args: {
    variant: "black",
    size: "large",
    children: "Button",
    "aria-label": "Кпнока",
  },
};

export const VariantDefaultDisabled: Story = {
  args: {
    variant: "default",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кпнока",
  },
};

export const VariantTintedDisabled: Story = {
  args: {
    variant: "tinted",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кпнока",
  },
};

export const VariantSecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кпнока",
  },
};

export const VariantBlackDisabled: Story = {
  args: {
    variant: "black",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кпнока",
  },
};
