import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

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
    setOpen: () => {},
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
        <CardWrapperItem>
          <div
            style={{
              height: "400px",
              width: "400px",
            }}
          >
            <Components.Feedback
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
