import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "~baseComponents";

const meta: Meta<typeof Dialog> = {
  title: "BaseComponents/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  args: {
    lang: "ru",
    size: "S",
    header: { title: "Dialog Header", isClosable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};
