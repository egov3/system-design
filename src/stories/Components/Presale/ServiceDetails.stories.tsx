"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";
import type { IServiceDetailsProps } from "~interfaces/PresaleTemplate";
import { CardWrapperItem } from "../../CardWrapperItem";

const ServiceDetailsComponent = ({ serviceId, lang }: IServiceDetailsProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <div
        style={{
          padding: "10px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <BaseComponents.Accordion
          open={showDetails}
          setOpen={setShowDetails}
          title={Components.PresaleComponent.AccordionTitle("Детали услуги")}
        >
          <Components.PresaleComponent.ServiceDetails
            serviceId={serviceId}
            lang={lang}
          />
        </BaseComponents.Accordion>
      </div>
    </CardWrapperItem>
  );
};

const meta = {
  title: "Components/Presale/ServiceDetails",
  component: ServiceDetailsComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    serviceId: { control: "select", options: ["P305", "P601", "P4042"] },
  },
  args: {},
} satisfies Meta<typeof Components.PresaleComponent.ServiceDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const R601: Story = {
  args: {
    serviceId: "P601",
    lang: "ru",
  },
};

export const R305: Story = {
  args: {
    serviceId: "P305",
    lang: "ru",
  },
};

export const P2203: Story = {
  args: {
    serviceId: "P2203",
    lang: "ru",
  },
};

export const P608: Story = {
  args: {
    serviceId: "P608",
    lang: "ru",
  },
};
export const P3061: Story = {
  args: {
    serviceId: "P3061",
    lang: "ru",
  },
};
