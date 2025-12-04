import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/internal/test";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Messages/MsgComponentHeader",
  component: Components.MsgComponentHeader,
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
            display: "flex",
            padding: "8px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            background: "var(--surface-surface-alt)",
            width: "700px",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {
    headerText: "Заявки по услугам",
    headerAriaLabel: "Заявки по услугам",
    handleOpenSearch: fn(),
    handleReadAll: fn(),
  },
} satisfies Meta<typeof Components.MsgComponentHeader>;

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
