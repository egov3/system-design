"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomSheet, Button } from "~baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

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
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
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
