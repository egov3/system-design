"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/RadioToggle",
  component: BaseComponents.RadioToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.RadioToggle>;

export default meta;

export const Unlock = () => {
  const [lock, setLock] = useState<boolean>(false);
  return (
    <CardWrapperItem>
      <BaseComponents.RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};

export const Lock = () => {
  const [lock, setLock] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <BaseComponents.RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};
