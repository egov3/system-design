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
    { label: "Удостоверение личности", value: "idCard" },
    { label: "Паспорт", value: "passport", hintText: "Для выезда за границу" },
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
        name="documentType"
        legend="Выберите тип документа"
        required
      />
    </CardWrapperItem>
  );
};
