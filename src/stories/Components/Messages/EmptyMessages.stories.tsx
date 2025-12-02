import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Messages/EmptyMessages",
  component: Components.EmptyMessages,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            backgroundColor: "#0f9000",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: { lang: "ru" },
} satisfies Meta<typeof Components.EmptyMessages>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Services: Story = {
  args: {
    pageType: "SERVICES",
  },
};

export const Notifications: Story = {
  args: {
    pageType: "NOTIFICATIONS",
  },
};
