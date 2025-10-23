import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";

const defaultArgs = {
  RadioGroupItems: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ],
  invokeCustomOnChange: fn(),
  setSelectedOption: () => {},
  selectedOption: "",
};

const meta = {
  title: "RadioGroup",
  component: Components.RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    ...defaultArgs,
  },
} satisfies Meta<typeof Components.RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultArgs,
};
