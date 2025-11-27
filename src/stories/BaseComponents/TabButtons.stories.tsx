"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { type TTabLabels, tabLabelsArray } from "~constants/TabButtons";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/TabButtons",
  component: BaseComponents.TabButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.TabButtons>;

export default meta;

export const TabButtons = () => {
  const [active, setActive] = useState<TTabLabels>("FIRST");

  return (
    <CardWrapperItem>
      <BaseComponents.TabButtons
        tabDocLabels={tabLabelsArray}
        activeTab={active}
        handleClick={(tabKey) => setActive(tabKey as TTabLabels)}
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
