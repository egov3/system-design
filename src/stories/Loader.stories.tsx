import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";

const meta: Meta<typeof BaseComponents.Loader> = {
  title: "Loader",
  component: BaseComponents.Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: () => (
    <div
      style={{
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BaseComponents.Loader />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

