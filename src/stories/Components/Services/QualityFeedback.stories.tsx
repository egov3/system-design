import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { QualityFeedback, QualityFeedbackReason } from "~components";

const meta: Meta<typeof QualityFeedback> = {
  title: "Components/Services/QualityFeedback",
  component: QualityFeedback,
  tags: ["autodocs"],
  args: {
    lang: "ru",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QualityFeedback>;

export const Default: Story = {};

export const SuccessMode: Story = {
  args: {
    isSuccessMode: true,
  },
};
