import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { HelpQuestionAnswer } from "~components";
import { HELP_QUESTION_ANSWER } from "~constants/mock/HelpQuestionAnswer";

import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Help/HelpQuestionAnswer",
  component: HelpQuestionAnswer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
  },
  args: {
    lang: "ru",
    title: HELP_QUESTION_ANSWER.TITLE,
    updatedDate: HELP_QUESTION_ANSWER.UPDATED_DATE,
    html: HELP_QUESTION_ANSWER.HTML,
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
    ),
  ],
} satisfies Meta<typeof HelpQuestionAnswer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Kk: Story = {
  args: { lang: "kk" },
};
