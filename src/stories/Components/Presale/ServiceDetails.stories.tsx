import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";
import { accordion, lists, lists_2 } from "~constants/mockData";
import type { ILangProps } from "~interfaces/common";
import { CardWrapperItem } from "../../CardWrapperItem";

const ServiceDetailsComponent = ({ lang }: ILangProps) => {
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
          title={
            <Components.PresaleComponent.AccordionTitle
              title={accordion[lang]}
            />
          }
        >
          <Components.PresaleComponent.ServiceDetails
            lang={lang}
            passportDetails={lists}
            servicesDetails={lists_2}
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
  argTypes: {},
  args: {},
} satisfies Meta<typeof Components.PresaleComponent.ServiceDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const R601: Story = {
  args: {
    lang: "ru",
  },
};
