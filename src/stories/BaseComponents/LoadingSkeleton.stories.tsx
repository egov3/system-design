import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { LoadingSkeleton } from "~baseComponents";
import { i18n } from "~constants/i18n";

const meta: Meta<typeof LoadingSkeleton> = {
  title: "BaseComponents/LoadingSkeleton",
  component: LoadingSkeleton,
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
type Story = StoryObj<typeof LoadingSkeleton>;

export const Default: Story = {};

export const WithLoadingTitle: Story = {
  args: {
    isTitleLoading: true,
  },
};
