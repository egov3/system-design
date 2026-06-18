import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { AuthQR, IdentityModal } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Identity/AuthQR",
  component: AuthQR,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <IdentityModal
          lang="ru"
          isMain={true}
          navigator={fn()}
          goBackService={fn()}
        >
          <Story />
        </IdentityModal>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    handleRefreshClick: fn(),
  },
} satisfies Meta<typeof AuthQR>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {
  args: {
    lang: "ru",
  },
};

export const English: Story = {
  args: {
    lang: "en",
  },
};

export const Kazakh: Story = {
  args: {
    lang: "kk",
  },
};
