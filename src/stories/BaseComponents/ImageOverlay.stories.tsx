import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { DownloadIcon } from "@egov3/graphics/General/Download";
import { fn } from "storybook/test";

import { ImageOverlay } from "src/baseComponents/ImageOverlay";

import photoSrc from "../assets/photo.jpg";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/ImageOverlay",
  component: ImageOverlay,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#ffffff", width: "600px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    src: photoSrc,
    alt: "Фотография",
    button: {
      icon: <DownloadIcon width="20" height="20" fill="#fff" />,
      ariaLabel: "Скачать",
      onClick: fn(),
    },
  },
} satisfies Meta<typeof ImageOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
