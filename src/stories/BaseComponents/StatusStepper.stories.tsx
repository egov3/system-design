"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { StatusStepper } from "~baseComponents";
import { STEP_TEXT, SUBTITLE_TEXT } from "~constants/mock/StatusStepper";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/StatusStepper",
  component: StatusStepper,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            backgroundColor: "#ffffff",
            width: "320px",
            padding: "16px",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof StatusStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    steps: [
      {
        id: "sent",
        title: STEP_TEXT.SENT,
        subtitle: SUBTITLE_TEXT.SENT_DATE,
        state: "completed",
        variant: "dot",
      },
      {
        id: "response",
        title: STEP_TEXT.RESPONSE,
        subtitle: SUBTITLE_TEXT.PENDING,
        state: "current",
      },
      {
        id: "result",
        title: STEP_TEXT.RESULT,
        subtitle: SUBTITLE_TEXT.PENDING,
        state: "pending",
      },
    ],
  },
};

export const AllPending: Story = {
  args: {
    steps: [
      {
        id: "sent",
        title: STEP_TEXT.SENT,
        subtitle: SUBTITLE_TEXT.PENDING,
        state: "current",
      },
      {
        id: "response",
        title: STEP_TEXT.RESPONSE,
        subtitle: SUBTITLE_TEXT.PENDING,
        state: "pending",
      },
      {
        id: "result",
        title: STEP_TEXT.RESULT,
        subtitle: SUBTITLE_TEXT.PENDING,
        state: "pending",
      },
    ],
  },
};

export const AllError: Story = {
  args: {
    steps: [
      {
        id: "sent",
        title: STEP_TEXT.SENT,
        subtitle: SUBTITLE_TEXT.ERROR,
        state: "error",
        variant: "dot",
      },
      {
        id: "response",
        title: STEP_TEXT.RESPONSE,
        subtitle: SUBTITLE_TEXT.ERROR,
        state: "error",
        variant: "dot",
      },
      {
        id: "result",
        title: STEP_TEXT.RESULT,
        subtitle: SUBTITLE_TEXT.ERROR,
        state: "error",
      },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    steps: [
      {
        id: "sent",
        title: STEP_TEXT.SENT,
        subtitle: SUBTITLE_TEXT.SENT_DATE,
        state: "completed",
        variant: "dot",
      },
      {
        id: "response",
        title: STEP_TEXT.RESPONSE,
        subtitle: SUBTITLE_TEXT.COMPLETED_DATE,
        state: "completed",
        variant: "dot",
      },
      {
        id: "result",
        title: STEP_TEXT.RESULT,
        subtitle: SUBTITLE_TEXT.SUCCESS,
        state: "completed",
      },
    ],
  },
};
