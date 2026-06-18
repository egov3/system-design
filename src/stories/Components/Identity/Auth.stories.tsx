import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Auth, AuthQR, IdentityModal } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Identity/Auth",
  component: Auth,
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
    handleEdsClick: fn(),
    handleRegistrationClick: fn(),
    handleDownloadAppClick: fn(),
  },
} satisfies Meta<typeof Auth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {
  args: {
    lang: "ru",
    qrCode: <AuthQR handleRefreshClick={fn()} lang="ru" />,
  },
};

export const English: Story = {
  args: {
    lang: "en",
    qrCode: <AuthQR handleRefreshClick={fn()} lang="en" />,
  },
};

export const Kazakh: Story = {
  args: {
    lang: "kk",
    qrCode: <AuthQR handleRefreshClick={fn()} lang="kk" />,
  },
};
