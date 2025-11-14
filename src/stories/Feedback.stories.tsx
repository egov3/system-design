import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";

const meta = {
  title: "Feedback",
  component: Components.Feedback,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    lang: "ru",
    onAction: () => {},
    rating: 5,
    value: "",
    onChange: () => {},
    setRating: () => {},
  },
} satisfies Meta<typeof Components.Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const InteractiveComponent = () => {
      const [rating, setRating] = useState(5);
      const [feedbackText, setFeedbackText] = useState("");

      return (
        <Components.Feedback
          {...args}
          rating={rating}
          setRating={setRating}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
      );
    };

    return <InteractiveComponent />;
  },
};
