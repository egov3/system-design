import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/internal/test";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Services/NextStepComponent",
  component: Components.NextStepComponent,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: "500px",
            height: "100px",
            backgroundColor: "#fff",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
  args: {
    handleNextStepClick: fn(),
  },
} satisfies Meta<typeof Components.NextStepComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
    disabled: false,
  },
};
