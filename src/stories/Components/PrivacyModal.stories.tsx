import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PrivacyModal } from "~components";

const meta = {
  title: "Components/PrivacyModal",
  component: PrivacyModal,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PrivacyModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
  },
};
