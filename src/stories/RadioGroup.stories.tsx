"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "RadioGroup",
  component: BaseComponents.RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.RadioGroup>;

export default meta;

export const RadioGroupStory = () => {
  const radioGroupItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(radioGroupItems[0].value);

  return (
    <CardWrapperItem>
      <BaseComponents.RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
    </CardWrapperItem>
  );
};
