// src/stories/ErrorModalUI.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta: Meta<typeof Components.ErrorModal> = {
  title: "ErrorModal",
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
    open: {
      control: { type: "boolean" },
    },
    lang: {
      control: { type: "select" },
      options: ["ru", "kk", "en"],
    },
    status: {
      control: { type: "number" },
    },
    message: {
      control: { type: "text" },
    },
    onClose: {
      action: "onClose",
    },
    onAuthAction: {
      action: "onAuthAction",
    },
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          width: "400px",
          display: "flex",
          alignContent: "center",
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
    open: true,
    lang: "ru",
    status: 500,
    message: "Произошла непредвиденная ошибка при обработке запроса",
  },
};

export const AuthError: Story = {
  args: {
    open: true,
    lang: "ru",
    status: 401,
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "500px",
          width: "500px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.ErrorModal {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export const WithoutMessage: Story = {
  args: {
    open: true,
    lang: "ru",
    status: 404,
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.ErrorModal {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export const KazakhLanguage: Story = {
  args: {
    open: true,
    lang: "kk",
    status: 500,
    message: "Жүйеде қате орын алды",
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.ErrorModal {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export const EnglishLanguage: Story = {
  args: {
    open: true,
    lang: "en",
    status: 500,
    message: "System error occurred",
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.ErrorModal {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export const Closed: Story = {
  args: {
    open: false,
    lang: "ru",
    status: 500,
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.ErrorModal {...args} />
      </div>
    </CardWrapperItem>
  ),
};
