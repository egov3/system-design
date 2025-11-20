// src/stories/Button.stories.tsx

import { Icons } from "@egov3/graphics";
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
    "aria-label": "Кнопка",
  },
};

export const NotRounded: Story = {
  args: {
    isRounded: false,
    size: "large",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const Mini: Story = {
  args: {
    size: "mini",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const VariantDefault: Story = {
  args: {
    variant: "default",
    size: "large",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const VariantTinted: Story = {
  args: {
    variant: "tinted",
    size: "large",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const VariantSecondary: Story = {
  args: {
    variant: "secondary",
    size: "large",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const VariantBlack: Story = {
  args: {
    variant: "black",
    size: "large",
    children: "Button",
    "aria-label": "Кнопка",
  },
};

export const VariantDefaultDisabled: Story = {
  args: {
    variant: "default",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кнопка",
  },
};

export const VariantTintedDisabled: Story = {
  args: {
    variant: "tinted",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кнопка",
  },
};

export const VariantSecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кнопка",
  },
};

export const VariantBlackDisabled: Story = {
  args: {
    variant: "black",
    size: "large",
    children: "Button",
    disabled: true,
    "aria-label": "Кнопка",
  },
};

export const VariantDefaultDisabledIcon: Story = {
  args: {
    variant: "default",
    size: "large",
    children: (
      <Icons.Additional.SettingsOutline width={24} height={24} fill="#fff" />
    ),
    disabled: true,
    "aria-label": "Кнопка",
    isIcon: true,
  },
};
