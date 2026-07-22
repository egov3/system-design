"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomSheet, Button } from "~baseComponents";
import { StoryPortalFrame } from "../StoryPortalFrame";

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

const meta: Meta<typeof BottomSheet> = {
  title: "BaseComponents/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryPortalFrame
        style={{
          width: 390,
          height: 700,
          margin: "0 auto",
          borderRadius: 24,
          border: "1px solid var(--icon-tertiary, #ccc)",
        }}
      >
        <Story />
      </StoryPortalFrame>
    ),
  ],
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

// Note: Drag the grabber down past ~100px to dismiss; release earlier to snap back.
export const DragToClose: Story = {
  args: {
    title: "Drag to close",
    children: (
      <div style={{ padding: 16 }}>
        Drag the grabber at the top downwards to close this sheet.
      </div>
    ),
  },
};
