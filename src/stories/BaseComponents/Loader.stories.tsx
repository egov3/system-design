import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Loader } from "~baseComponents";

const meta: Meta<typeof Loader> = {
  title: "BaseComponents/Loader",
  component: Loader,
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
      <Loader />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
