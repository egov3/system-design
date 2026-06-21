import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";

const meta = {
  title: "Components/Search/SearchQualityFeedbackReason",
  component: Components.SearchQualityFeedbackReason,
  args: {
    lang: "ru",
    onCancel: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof Components.SearchQualityFeedbackReason>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
