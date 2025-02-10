"use client";

import { Components } from "~components";
import React, { useState } from "react";

import { CardWrapperItem } from "./CardWrapperItem";

const DefaultAccordionComponent = () => {
  const [open, setOpen] = useState(true);
  return (
    <CardWrapperItem>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <Components.Accordion
          open={open}
          setOpen={setOpen}
          title={<>AccordionStory</>}
        >
          Accordion
        </Components.Accordion>
      </div>
    </CardWrapperItem>
  );
};

export const AccordionStory = () => <DefaultAccordionComponent />;

const meta = {
  title: "Accordion",
  component: Components.Accordion,
};

export default meta;
