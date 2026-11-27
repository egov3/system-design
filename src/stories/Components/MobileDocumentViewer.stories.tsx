import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { MobileDocumentViewer } from "~components";

import styles from "./MobileDocumentViewer.stories.module.css";

const documentPage = (
  <div className={styles.documentPage}>Содержимое документа</div>
);

const meta: Meta<typeof MobileDocumentViewer> = {
  title: "Components/MobileDocumentViewer",
  component: MobileDocumentViewer,
  parameters: { layout: "fullscreen", docs: { story: { height: "100vh" } } },
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
