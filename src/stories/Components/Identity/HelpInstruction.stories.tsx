import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Identity/HelpInstruction",
  component: Components.HelpInstruction,
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
} satisfies Meta<typeof Components.HelpInstruction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {
  args: {
    lang: "ru",
  },
};

export const Kazakh: Story = {
  args: {
    lang: "kk",
  },
};

export const English: Story = {
  args: {
    lang: "en",
  },
};
