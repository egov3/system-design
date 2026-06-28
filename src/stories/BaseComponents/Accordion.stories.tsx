"use client";

import { useState } from "react";
import { Accordion } from "../../baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

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
        <Accordion open={open} setOpen={setOpen} title={<>AccordionStory</>}>
          Accordion
        </Accordion>
      </div>
    </CardWrapperItem>
  );
};

export const AccordionStory = () => <DefaultAccordionComponent />;

const meta = {
  title: "BaseComponents/Accordion",
  component: Accordion,
};

export default meta;
