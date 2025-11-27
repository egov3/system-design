import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import { CardWrapperItem } from "../CardWrapperItem";

const meta: Meta<typeof Components.ErrorModal> = {
  title: "Components/ErrorModal",
  component: Components.ErrorModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    lang: "ru",
    status: 500,
    message: "Произошла непредвиденная ошибка",
  },
  argTypes: {
    open: { control: "boolean" },
    lang: { control: "select", options: ["ru", "kk", "en"] },
    status: { control: "number" },
    message: { control: "text" },
    onClose: { action: "onClose" },
    onAuthAction: { action: "onAuthAction" },
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "500px",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.ErrorModal {...args} />
      </div>
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
