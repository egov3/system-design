"use client";

import type { Meta } from "@storybook/react-webpack5";
import { type Dispatch, type SetStateAction, useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "TabButtons",
  component: BaseComponents.TabButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.TabButtons>;

export default meta;

const TabLabels = {
  FIRST: "First Tab",
  SECOND: "Second Tab",
} as const;

type TTabLabels = keyof typeof TabLabels;

interface ITabItem {
  text: string;
  key: string;
}

const tabLabelsArray = Object.entries(TabLabels).map(([key, value]) => ({
  key,
  text: value,
})) as ITabItem[];

export const TabButtons = () => {
  const [active, setActive] = useState<TTabLabels>("FIRST");

  return (
    <CardWrapperItem>
      <BaseComponents.TabButtons
        tabDocLabels={tabLabelsArray}
        activeTab={active}
        setActiveTab={setActive as Dispatch<SetStateAction<string>>}
      />
      {active === "FIRST" ? (
        <BaseComponents.Typography tag="span" fontClass="body1Medium">
          Content of First Tab
        </BaseComponents.Typography>
      ) : (
        <BaseComponents.Typography tag="span" fontClass="body1Medium">
          Content of Second Tab
        </BaseComponents.Typography>
      )}
    </CardWrapperItem>
  );
};
