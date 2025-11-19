import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";

const meta: Meta<typeof BaseComponents.Overlay> = {
  title: "Overlay",
  component: BaseComponents.Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: () => (
    <div
      style={{
        width: "400px",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BaseComponents.Overlay>
        <div
          style={{
            backgroundColor: "bisque",
            height: "100px",
            width: "100px",
          }}
        >
          Overlay test
        </div>
      </BaseComponents.Overlay>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
