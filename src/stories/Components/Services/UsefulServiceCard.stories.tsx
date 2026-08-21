import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { usefulServiceCardItems } from "__tests__/Mock/usefulServiceCardItems";
import { UsefulServiceCard } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Services/UsefulServiceCard",
  component: UsefulServiceCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: "250px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof UsefulServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ELicense: Story = {
  args: usefulServiceCardItems[0],
};

export const SmartBridge: Story = {
  args: usefulServiceCardItems[1],
};
