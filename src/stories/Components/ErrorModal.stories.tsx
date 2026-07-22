import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ErrorModal } from "~components";
import { CardWrapperItem } from "../CardWrapperItem";
import { StoryPortalFrame } from "../StoryPortalFrame";

const meta: Meta<typeof ErrorModal> = {
  title: "Components/ErrorModal",
  component: ErrorModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
    lang: "ru",
    status: 500,
    message: "Произошла непредвиденная ошибка",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    lang: { control: "select", options: ["ru", "kk", "en"] },
    status: { control: "number" },
    message: { control: "text" },
    onClose: { action: "onClose" },
    onAuthAction: { action: "onAuthAction" },
  },
  render: (args) => (
    <CardWrapperItem>
      <StoryPortalFrame
        style={{
          height: 500,
          width: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorModal {...args} />
      </StoryPortalFrame>
    </CardWrapperItem>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Произошла непредвиденная ошибка при обработке запроса",
  },
};

export const AuthError: Story = {
  args: {
    status: 401,
  },
};

export const WithoutMessage: Story = {
  args: {
    status: 404,
    message: undefined,
  },
};

export const KazakhLanguage: Story = {
  args: {
    lang: "kk",
    message: "Жүйеде қате орын алды",
  },
};

export const EnglishLanguage: Story = {
  args: {
    lang: "en",
    message: "System error occurred",
  },
};
