import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { MobileDocumentViewer } from "~components";

const documentPage = (
  <div
    style={{
      width: "min(100%, 595px)",
      minHeight: 840,
      margin: "0 auto",
      padding: 32,
      background: "var(--page-color-background-white)",
    }}
  >
    Содержимое документа
  </div>
);

const meta: Meta<typeof MobileDocumentViewer> = {
  title: "Components/MobileDocumentViewer",
  component: MobileDocumentViewer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    title: "Документ заявки №101000000004945",
    backLabel: "Вернуться",
    shareLabel: "Поделиться",
    onBack: () => {},
    onShare: () => {},
    isLoading: false,
    children: documentPage,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};
