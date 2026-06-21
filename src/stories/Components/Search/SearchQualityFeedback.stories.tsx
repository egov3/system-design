import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";

const meta = {
  title: "Components/Search/SearchQualityFeedback",
  component: Components.SearchQualityFeedback,
  args: {
    lang: "ru",
    onLowRating: fn(),
  },
} satisfies Meta<typeof Components.SearchQualityFeedback>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
