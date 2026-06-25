import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";

const meta: Meta<typeof BaseComponents.LoadingSkeleton> = {
  title: "BaseComponents/LoadingSkeleton",
  component: BaseComponents.LoadingSkeleton,
  tags: ["autodocs"],
  args: {
    title: i18n.LoadingSkeleton.title.ru,
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BaseComponents.LoadingSkeleton>;

export const Default: Story = {};

export const WithVisibleTitle: Story = {
  args: {
    isTitleVisible: true,
  },
};
