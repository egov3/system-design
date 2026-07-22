import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Feedback } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";
import { StoryPortalFrame } from "../../StoryPortalFrame";

const meta = {
  title: "Components/Services/Feedback",
  component: Feedback,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    lang: "ru",
    onAction: () => {},
    rating: 0,
    value: "",
    onChange: () => {},
    setRating: () => {},
    setOpen: () => {},
  },
} satisfies Meta<typeof Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const InteractiveComponent = () => {
      const [rating, setRating] = useState(0);
      const [feedbackText, setFeedbackText] = useState("");

      return (
        <CardWrapperItem>
          <StoryPortalFrame style={{ height: 500, width: 500 }}>
            <Feedback
              {...args}
              rating={rating}
              setRating={setRating}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </StoryPortalFrame>
        </CardWrapperItem>
      );
    };

    return <InteractiveComponent />;
  },
};

export const BottomSheet: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    const InteractiveComponent = () => {
      const [rating, setRating] = useState(0);
      const [feedbackText, setFeedbackText] = useState("");

      return (
        <StoryPortalFrame
          style={{
            width: 390,
            height: 700,
            borderRadius: 24,
            border: "1px solid var(--icon-tertiary, #ccc)",
            background: "var(--bg-primary, #fff)",
          }}
        >
          <Feedback
            {...args}
            variant="bottomSheet"
            rating={rating}
            setRating={setRating}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </StoryPortalFrame>
      );
    };

    return <InteractiveComponent />;
  },
};
