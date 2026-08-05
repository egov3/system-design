import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Agreement, IdentityModal } from "~components";
import { htmlText } from "~constants/mock";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Identity/Agreement",
  component: Agreement,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
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
    agreementText: "",
    submitAgreementAndSign: fn(),
  },
} satisfies Meta<typeof Agreement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
    agreementText: htmlText,
  },
};
