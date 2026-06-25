import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { QualityFeedback, QualityFeedbackReason } from "~components";

const meta: Meta<typeof QualityFeedbackReason> = {
  title: "Components/Services/QualityFeedbackReason",
  component: QualityFeedbackReason,
  tags: ["autodocs"],
  args: {
    initialComment: "",
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
type Story = StoryObj<typeof QualityFeedbackReason>;

export const Default: Story = {};
