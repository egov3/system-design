"use client";

import { Сomponents } from "~components";
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
        <Сomponents.Accordion
          open={open}
          setOpen={setOpen}
          title={<>AccordionStory</>}
        >
          Accordion
        </Сomponents.Accordion>
      </div>
    </CardWrapperItem>
  );
};

export const AccordionStory = () => <DefaultAccordionComponent />;

const meta = {
  title: "Accordion",
  component: Сomponents.Accordion,
};

export default meta;
