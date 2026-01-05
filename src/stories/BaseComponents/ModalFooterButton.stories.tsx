import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";

const meta = {
  title: "BaseComponents/ModalFooterButton",
  component: BaseComponents.ModalFooterButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: {},

  decorators: [
    (Story) => (
      <div style={{ width: 400, height: 400 }}>
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <BaseComponents.Modal
      open
      setOpen={() => {}}
      variant="small"
      lang="ru"
      footer={<BaseComponents.ModalFooterButton {...args} />}
    >
      <div style={{ padding: 24, textAlign: "center" }}>Modal content</div>
    </BaseComponents.Modal>
  ),
} satisfies Meta<typeof BaseComponents.ModalFooterButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneButton: Story = {
  args: {
    buttonList: [
      {
        text: "OK",
        onClick: () => console.log("OK"),
        dataTestid: "ButtonList_OK",
      },
    ],
  },
};

export const WithTwoButtons: Story = {
  args: {
    buttonList: [
      {
        text: "Cancel",
        onClick: () => console.log("Cancel"),
        disabled: true,
        dataTestid: "ButtonList_CANCEL",
      },
      {
        text: "Confirm",
        onClick: () => console.log("Confirm"),
      },
    ],
  },
};

export const NoButtons: Story = {
  args: {
    buttonList: [],
  },
};
