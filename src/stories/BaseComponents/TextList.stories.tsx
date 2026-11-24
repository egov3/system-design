import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { textListItems } from "__tests__/Mock/textListItems";
import { TextList } from "~baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/TextList",
  component: TextList,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    items: textListItems,
  },
} satisfies Meta<typeof TextList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
