import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "Auth",
  component: Components.Auth,
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
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "url(/img/bg/Auth-bg.webp) no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          <Components.IdentityModal
            lang="ru"
            isMain={true}
            navigator={fn()}
            goBackService={fn()}
          >
            <Story />
          </Components.IdentityModal>
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    lang: "ru",
    handleEdsClick: fn(),
    handleRegistrationClick: fn(),
    handleDownloadAppClick: fn(),
  },
} satisfies Meta<typeof Components.Auth>;

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
