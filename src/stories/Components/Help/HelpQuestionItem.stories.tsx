import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";
import { fn } from "storybook/test";

import { HelpQuestionAnswer, HelpQuestionItem } from "~components";
import { HELP_QUESTION_ANSWER } from "~constants/mock/HelpQuestionAnswer";
import { HELP_QUESTION_ITEM_TITLE } from "~constants/mock/HelpQuestionItem";

import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Help/HelpQuestionItem",
  component: HelpQuestionItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    children: { table: { disable: true } },
  },
  args: {
    title: HELP_QUESTION_ITEM_TITLE,
    isOpen: false,
    onToggle: fn(),
    children: (
      <HelpQuestionAnswer
        lang="ru"
        title={HELP_QUESTION_ANSWER.TITLE}
        updatedDate={HELP_QUESTION_ANSWER.UPDATED_DATE}
        html={HELP_QUESTION_ANSWER.HTML}
      />
    ),
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
    ),
  ],
} satisfies Meta<typeof HelpQuestionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <HelpQuestionItem
        {...args}
        isOpen={isOpen}
        onToggle={() => {
          setIsOpen(!isOpen);
        }}
      />
    );
  },
};

export const Opened: Story = {
  args: { isOpen: true },
};

export const OpenedWithoutAnswer: Story = {
  args: { isOpen: true, children: null },
};
