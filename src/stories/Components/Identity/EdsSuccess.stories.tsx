import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { EdsSuccess, IdentityModal } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Identity/EdsSuccess",
  component: EdsSuccess,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <IdentityModal lang="ru" handleLogoClick={fn()} goBackService={fn()}>
          <Story />
        </IdentityModal>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    handleEdsOnclick: fn(),
  },
} satisfies Meta<typeof EdsSuccess>;

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
