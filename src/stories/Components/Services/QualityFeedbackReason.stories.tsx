import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { ComponentProps } from "react";
import { useState } from "react";
import { fn } from "storybook/test";
import { Components } from "~components";

const QualityFeedbackReasonPreview = (
  args: ComponentProps<typeof Components.QualityFeedbackReason>,
) => {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  if (isSuccessVisible) {
    return (
      <div style={{ width: 760 }}>
        <Components.QualityFeedback
          isSuccessMode
          lang={args.lang}
          onLowRating={fn()}
          onReset={() => setIsSuccessVisible(false)}
        />
      </div>
    );
  }

  return (
    <Components.QualityFeedbackReason
      {...args}
      onSubmit={(comment) => {
        args.onSubmit(comment);
        setIsSuccessVisible(true);
      }}
    />
  );
};

const meta = {
  title: "Components/Services/QualityFeedbackReason",
  component: Components.QualityFeedbackReason,
  args: {
    lang: "ru",
    onCancel: fn(),
    onSubmit: fn(),
  },
  render: (args) => <QualityFeedbackReasonPreview {...args} />,
} satisfies Meta<typeof Components.QualityFeedbackReason>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
