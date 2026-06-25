import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta: Meta<typeof Components.QualityFeedbackReason> = {
  title: "Components/Services/QualityFeedbackReason",
  component: Components.QualityFeedbackReason,
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
type Story = StoryObj<typeof Components.QualityFeedbackReason>;

export const Default: Story = {};
