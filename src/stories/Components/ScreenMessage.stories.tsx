import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { RegistrationSuccessIllustration } from "@egov3/graphics/Illustrations/RegistrationSuccess";

import { ScreenMessage } from "~components";

import { CardWrapperItem } from "../CardWrapperItem";

const meta: Meta<typeof ScreenMessage> = {
  title: "Components/ScreenMessage",
  component: ScreenMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
    lang: "ru",
    illustration: <RegistrationSuccessIllustration />,
    title: "Проверка пройдена",
    subtext:
      "Фотография и подпись успешно прошли проверку. Продолжите заполнение заявления.",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    lang: { control: "select", options: ["ru", "kk", "en"] },
    title: { control: "text" },
    subtext: { control: "text" },
    illustration: { control: false },
    footerButtons: { control: "object" },
    onClose: { action: "onClose" },
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "600px",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScreenMessage {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    footerButtons: [
      {
        text: "Продолжить",
        onClick: () => {},
        dataTestid: "ScreenMessage_CONTINUE_BTN",
      },
    ],
  },
};

export const WithoutButtons: Story = {};

export const WithoutSubtext: Story = {
  args: {
    subtext: undefined,
  },
};
