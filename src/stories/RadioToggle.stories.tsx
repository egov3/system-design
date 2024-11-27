"use client";

import type { Meta } from "@storybook/react";
import React, { useState } from "react";
import { Сomponents } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "RadioToggle",
  component: Сomponents.RadioToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Сomponents.RadioToggle>;

export default meta;

export const Unlock = () => {
  const [lock, setLock] = useState<boolean>(false);
  return (
    <CardWrapperItem>
      <Сomponents.RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};

export const Lock = () => {
  const [lock, setLock] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <Сomponents.RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};
