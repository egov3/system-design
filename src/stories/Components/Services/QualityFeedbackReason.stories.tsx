import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";

const meta = {
  title: "Components/Services/QualityFeedbackReason",
  component: Components.QualityFeedbackReason,
  args: {
    lang: "ru",
    onCancel: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof Components.QualityFeedbackReason>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
