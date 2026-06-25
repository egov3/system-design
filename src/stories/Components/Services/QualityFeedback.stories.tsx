import type { Meta, StoryObj } from "@storybook/react-webpack5";
import type { ComponentProps } from "react";
import { useState } from "react";
import { QualityFeedback, QualityFeedbackReason } from "~components";
import type { ILangProps } from "~interfaces/common";

const meta: Meta<typeof QualityFeedback> = {
  title: "Components/Services/QualityFeedback",
  component: QualityFeedback,
  tags: ["autodocs"],
  args: {
    lang: "ru",
    onLowRating: () => undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QualityFeedback>;
type TPreviewArgs = Partial<ComponentProps<typeof QualityFeedback>> &
  ILangProps;

const QualityFeedbackPreview = (args: TPreviewArgs) => {
  const [view, setView] = useState<"feedback" | "reason" | "success">(
    "feedback",
  );
  const currentLang = args.lang;

  if (view === "success") {
    return (
      <QualityFeedback
        {...args}
        isSuccessMode
        lang={currentLang}
        onLowRating={() => setView("reason")}
        onReset={() => {
          setView("feedback");
        }}
      />
    );
  }

  if (view === "reason") {
    return (
      <QualityFeedbackReason
        lang={currentLang}
        onCancel={() => {
          setView("feedback");
        }}
        onSubmit={() => setView("success")}
      />
    );
  }

  return (
    <QualityFeedback
      {...args}
      lang={currentLang}
      onLowRating={() => {
        setView("reason");
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => (
    <QualityFeedbackPreview {...args} lang={args.lang ?? "ru"} />
  ),
};

export const SuccessMode: Story = {
  args: {
    isSuccessMode: true,
  },
};
