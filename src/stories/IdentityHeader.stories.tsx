"use client";

import type { Meta } from "@storybook/react-webpack5";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "IdentityHeader",
  component: Components.IdentityHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.IdentityHeader>;

export default meta;

export const IdentityHeader = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          backgroundColor: 'var(--default-white-color)',
          borderRadius: '16px',
          width: '400px',
        }}
      >
        <Components.IdentityHeader
          goBackService={() => { }}
          goMain={() => { }}
          lang="ru" />
      </div>
    </CardWrapperItem>
  )
};
