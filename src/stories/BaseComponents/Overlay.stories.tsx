import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {  Overlay } from "~baseComponents";

const meta: Meta<typeof Overlay> = {
  title: "BaseComponents/Overlay",
  component: Overlay,
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
      <Overlay>
        <div
          style={{
            backgroundColor: "bisque",
            height: "100px",
            width: "100px",
          }}
        >
          Overlay test
        </div>
      </Overlay>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
