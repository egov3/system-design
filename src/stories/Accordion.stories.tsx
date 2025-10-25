"use client";

import { useState } from "react";
import { BaseComponents } from "../baseComponents";

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
        <BaseComponents.Accordion
          open={open}
          setOpen={setOpen}
          title={<>AccordionStory</>}
        >
          Accordion
        </BaseComponents.Accordion>
      </div>
    </CardWrapperItem>
  );
};

export const AccordionStory = () => <DefaultAccordionComponent />;

const meta = {
  title: "Accordion",
  component: BaseComponents.Accordion,
};

export default meta;
