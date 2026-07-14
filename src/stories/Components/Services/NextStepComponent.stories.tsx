import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/internal/test";
import { NextStepComponent } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Services/NextStepComponent",
  component: NextStepComponent,
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
} satisfies Meta<typeof NextStepComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
    disabled: false,
  },
};

export const Mobile: Story = {
  args: {
    lang: "ru",
    disabled: false,
    isMobile: true,
  },
};
