"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "SelectBoxButton",
  component: BaseComponents.SelectBoxButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseComponents.SelectBoxButton>;

export default meta;

export const SelectBoxButtonEnabled = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <CardWrapperItem>
      <BaseComponents.SelectBoxButton
        labelText="Select Box Button"
        disabled={false}
        error={false}
        modalValue="Selected Value"
        lang="en"
        setIsOpen={() => setOpen(!open)}
      />
    </CardWrapperItem>
  );
};

export const SelectBoxButtonDisabled = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <CardWrapperItem>
      <BaseComponents.SelectBoxButton
        labelText="Select Box Button"
        disabled={true}
        error={false}
        modalValue="Selected Value"
        lang="en"
        setIsOpen={() => setOpen(!open)}
      />
    </CardWrapperItem>
  );
};
