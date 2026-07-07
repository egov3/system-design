"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { RadioGroup } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const RadioGroupStory = () => {
  const radioGroupItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2", hintText: "HintText" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    radioGroupItems[0].value,
  );

  return (
    <CardWrapperItem>
      <RadioGroup
        radioGroupItems={radioGroupItems}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
    </CardWrapperItem>
  );
};
