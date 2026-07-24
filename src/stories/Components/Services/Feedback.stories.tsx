import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Feedback } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

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
          <div
            style={{
              height: "400px",
              width: "400px",
            }}
          >
            <Feedback
              {...args}
              rating={rating}
              setRating={setRating}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>
        </CardWrapperItem>
      );
    };

    return <InteractiveComponent />;
  },
};

export const Mobile: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => {
    const InteractiveComponent = () => {
      const [rating, setRating] = useState(0);
      const [feedbackText, setFeedbackText] = useState("");

      return (
        <div
          style={{
            transform: "translateZ(0)",
            position: "relative",
            width: 390,
            height: 700,
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: 24,
            border: "1px solid var(--icon-tertiary, #ccc)",
          }}
        >
          <Feedback
            {...args}
            isMobile
            rating={rating}
            setRating={setRating}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </div>
      );
    };

    return <InteractiveComponent />;
  },
};
