import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "src/baseComponents/Dialog";

const meta: Meta<typeof Dialog> = {
  title: "BaseComponents/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        iframeHeight: 320,
      },
    },
  },
  args: {
    lang: "ru",
    header: { title: "Dialog Header", isClosable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};
