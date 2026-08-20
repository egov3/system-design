import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { socialCardItems } from "__tests__/Mock/socialCardItems";
import { SocialCard } from "~components";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "Components/SocialCard",
  component: SocialCard,
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
} satisfies Meta<typeof SocialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Instagram: Story = {
  args: socialCardItems[0],
};

export const Aitu: Story = {
  args: socialCardItems[1],
};
