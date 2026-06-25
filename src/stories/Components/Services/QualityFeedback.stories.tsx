import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta: Meta<typeof Components.QualityFeedback> = {
  title: "Components/Services/QualityFeedback",
  component: Components.QualityFeedback,
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
type Story = StoryObj<typeof Components.QualityFeedback>;

export const Default: Story = {};
