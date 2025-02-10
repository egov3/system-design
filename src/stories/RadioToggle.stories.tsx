"use client";

import type { Meta } from "@storybook/react";
import React, { useState } from "react";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "RadioToggle",
  component: Components.RadioToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.RadioToggle>;

export default meta;

export const Unlock = () => {
  const [lock, setLock] = useState<boolean>(false);
  return (
    <CardWrapperItem>
      <Components.RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};

export const Lock = () => {
  const [lock, setLock] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <Components.RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};
