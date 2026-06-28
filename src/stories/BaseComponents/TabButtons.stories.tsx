"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { TabButtons, Typography } from "~baseComponents";
import { type TTabLabels, tabLabelsArray } from "~constants/TabButtons";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/TabButtons",
  component: TabButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof TabButtons>;

export default meta;

export const TabButtonsSb = () => {
  const [active, setActive] = useState<TTabLabels>("FIRST");

  return (
    <CardWrapperItem>
      <TabButtons
        tabDocLabels={tabLabelsArray}
        activeTab={active}
        handleClick={(tabKey) => setActive(tabKey as TTabLabels)}
      />
      {active === "FIRST" ? (
        <Typography tag="span" fontClass="body1Medium">
          Content of First Tab
        </Typography>
      ) : (
        <Typography tag="span" fontClass="body1Medium">
          Content of Second Tab
        </Typography>
      )}
    </CardWrapperItem>
  );
};
