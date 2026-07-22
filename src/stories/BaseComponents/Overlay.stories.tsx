import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Overlay } from "~baseComponents";
import { StoryPortalFrame } from "../StoryPortalFrame";

const meta: Meta<typeof Overlay> = {
  title: "BaseComponents/Overlay",
  component: Overlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: () => (
    <StoryPortalFrame
      style={{
        width: 400,
        height: 400,
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
    </StoryPortalFrame>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
