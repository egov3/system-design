import { Graphics } from "@egov3/graphics";
import { AppStoreIllustration } from "@egov3/graphics/Illustrations/AppStore";
import { PlayStoreIllustration } from "@egov3/graphics/Illustrations/PlayStore";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { QRAppButton } from "~components";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "Components/QRAppButton",
  component: QRAppButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#fff" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof QRAppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppStore: Story = {
  args: {
    qrImage: (
      <img
        src={Graphics.QRs["App-store-qr"]}
        alt="Скачать в App Store — QR-код"
      />
    ),
    icon: <AppStoreIllustration aria-hidden="true" />,
    handleOrderService: () => {},
  },
};

export const GooglePlay: Story = {
  args: {
    qrImage: (
      <img
        src={Graphics.QRs["Google-play-qr"]}
        alt="Скачать в Google Play — QR-код"
      />
    ),
    icon: <PlayStoreIllustration aria-hidden="true" />,
    handleOrderService: () => {},
  },
};
