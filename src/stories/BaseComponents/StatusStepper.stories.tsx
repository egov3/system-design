"use client";

import { NotificationIcon } from "@egov3/graphics/General/Notification";
import { ScheduleIcon } from "@egov3/graphics/General/Schedule";
import { ShieldFailedIcon } from "@egov3/graphics/General/ShieldFailed";
import { StarIcon } from "@egov3/graphics/General/Star";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { StatusStepper } from "~baseComponents";
import {
  STATE_LABEL_TEXT,
  STEP_TEXT,
  SUBTITLE_TEXT,
} from "~constants/mock/StatusStepper";
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

export const AllStatesCircleVariant: Story = {
  name: "All states — circle variant (default)",
  args: {
    "aria-label": "Все состояния, вариант circle",
    steps: [
      {
        id: "pending",
        title: STATE_LABEL_TEXT.PENDING,
        state: "pending",
      },
      {
        id: "current",
        title: STATE_LABEL_TEXT.CURRENT,
        state: "current",
      },
      {
        id: "error",
        title: STATE_LABEL_TEXT.ERROR,
        state: "error",
      },
      {
        id: "completed",
        title: STATE_LABEL_TEXT.COMPLETED,
        state: "completed",
      },
    ],
  },
};

export const AllStatesCircleCustomIcons: Story = {
  name: "All states — circle variant (custom icons)",
  args: {
    "aria-label": "Все состояния, вариант circle с кастомными иконками",
    steps: [
      {
        id: "pending",
        title: STATE_LABEL_TEXT.PENDING,
        state: "pending",
        icon: <ScheduleIcon width={20} height={20} />,
      },
      {
        id: "current",
        title: STATE_LABEL_TEXT.CURRENT,
        state: "current",
        icon: <NotificationIcon width={20} height={20} />,
      },
      {
        id: "error",
        title: STATE_LABEL_TEXT.ERROR,
        state: "error",
        icon: <ShieldFailedIcon width={20} height={20} />,
      },
      {
        id: "completed",
        title: STATE_LABEL_TEXT.COMPLETED,
        state: "completed",
        icon: <StarIcon width={20} height={20} />,
      },
    ],
  },
};

export const AllStatesDotVariant: Story = {
  name: "All states — dot variant",
  args: {
    "aria-label": "Все состояния, вариант dot",
    steps: [
      {
        id: "pending",
        title: STATE_LABEL_TEXT.PENDING,
        state: "pending",
        variant: "dot",
      },
      {
        id: "current",
        title: STATE_LABEL_TEXT.CURRENT,
        state: "current",
        variant: "dot",
      },
      {
        id: "error",
        title: STATE_LABEL_TEXT.ERROR,
        state: "error",
        variant: "dot",
      },
      {
        id: "completed",
        title: STATE_LABEL_TEXT.COMPLETED,
        state: "completed",
        variant: "dot",
      },
    ],
  },
};
