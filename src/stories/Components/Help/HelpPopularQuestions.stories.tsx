import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";
import { fn } from "storybook/test";

import { HelpPopularQuestions } from "~components";
import { HELP_POPULAR_QUESTIONS } from "~constants/mock/HelpPopularQuestions";

const meta = {
  title: "Components/Help/HelpPopularQuestions",
  component: HelpPopularQuestions,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
  },
  args: {
    lang: "ru",
    title: "Популярные вопросы",
    questions: HELP_POPULAR_QUESTIONS,
    openQuestionId: null,
    onToggle: fn(),
  },
} satisfies Meta<typeof HelpPopularQuestions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

    return (
      <HelpPopularQuestions
        {...args}
        openQuestionId={openQuestionId}
        onToggle={(questionId) => {
          setOpenQuestionId(openQuestionId === questionId ? null : questionId);
        }}
      />
    );
  },
};

export const Opened: Story = {
  args: { openQuestionId: HELP_POPULAR_QUESTIONS[0].id },
};

export const OpenedKk: Story = {
  args: {
    lang: "kk",
    title: "Танымал сұрақтар",
    openQuestionId: HELP_POPULAR_QUESTIONS[0].id,
  },
};
