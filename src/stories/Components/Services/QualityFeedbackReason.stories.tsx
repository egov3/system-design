import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { ComponentProps } from "react";
import { useState } from "react";
import { fn } from "storybook/test";
import { QualityFeedback, QualityFeedbackReason } from "~components";

const QualityFeedbackReasonPreview = (
  args: ComponentProps<typeof QualityFeedbackReason>,
) => {
  const [view, setView] = useState<"reason" | "feedback" | "success">("reason");

  if (view === "feedback") {
    return (
      <div style={{ width: 760 }}>
        <QualityFeedback
          lang={args.lang}
          onLowRating={() => setView("reason")}
        />
      </div>
    );
  }

  if (view === "success") {
    return (
      <div style={{ width: 760 }}>
        <QualityFeedback
          isSuccessMode
          lang={args.lang}
          onLowRating={fn()}
          onReset={() => setView("feedback")}
        />
      </div>
    );
  }

  return (
    <QualityFeedbackReason
      {...args}
      onCancel={() => {
        args.onCancel();
        setView("feedback");
      }}
      onSubmit={(comment) => {
        args.onSubmit(comment);
        setView("success");
      }}
    />
  );
};

const meta = {
  title: "Components/Services/QualityFeedbackReason",
  component: QualityFeedbackReason,
  args: {
    lang: "ru",
    onCancel: fn(),
    onSubmit: fn(),
  },
  render: (args) => <QualityFeedbackReasonPreview {...args} />,
} satisfies Meta<typeof QualityFeedbackReason>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
