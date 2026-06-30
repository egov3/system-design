"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomSheet, Button } from "~baseComponents";

type BottomSheetProps = React.ComponentProps<typeof BottomSheet>;

const BottomSheetWithState: React.FC<BottomSheetProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <BottomSheet {...args} setIsOpen={setIsOpen} />
  ) : (
    <Button onClick={() => setIsOpen(true)} size="small" variant="tinted">
      Открыть
    </Button>
  );
};

const PhoneFrame = (Story: () => React.ReactElement): React.ReactElement => (
  <div
    style={{
      transform: "translateZ(0)",
      position: "relative",
      width: 390,
      height: 700,
      margin: "0 auto",
      overflow: "hidden",
      borderRadius: 24,
      border: "1px solid var(--icon-tertiary, #ccc)",
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof BottomSheet> = {
  title: "BaseComponents/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [PhoneFrame],
  args: {
    variant: "small",
    title: "BottomSheet Title",
    children: <div style={{ padding: 16 }}>BottomSheet content</div>,
  },
  render: (args) => <BottomSheetWithState {...args} />,
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Small: Story = {};

export const Large: Story = {
  args: {
    variant: "large",
    title: "Large BottomSheet",
    children: (
      <div style={{ padding: 16, height: 400 }}>Large BottomSheet content</div>
    ),
  },
};
