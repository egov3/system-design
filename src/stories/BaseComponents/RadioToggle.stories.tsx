"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { RadioToggle } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/RadioToggle",
  component: RadioToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof RadioToggle>;

export default meta;

export const Unlock = () => {
  const [lock, setLock] = useState<boolean>(false);
  return (
    <CardWrapperItem>
      <RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};

export const Lock = () => {
  const [lock, setLock] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <RadioToggle lock={lock} setLock={setLock} />
    </CardWrapperItem>
  );
};
