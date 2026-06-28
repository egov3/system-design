import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Accordion } from "~baseComponents";
import { PresaleComponent } from "~components";
import {
  accordion,
  passportDetails,
  serviceDetails,
} from "~constants/mockData";
import type { ILangProps } from "~interfaces/common";
import { CardWrapperItem } from "../../CardWrapperItem";

const ServiceDetailsComponent = ({ lang }: ILangProps) => {
  const [isShowDetails, setIsShowDetails] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <div
        style={{
          padding: "10px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <Accordion
          open={isShowDetails}
          setOpen={setIsShowDetails}
          title={<PresaleComponent.AccordionTitle title={accordion[lang]} />}
        >
          <PresaleComponent.ServiceDetails
            lang={lang}
            passportDetails={passportDetails}
            servicesDetails={serviceDetails}
          />
        </Accordion>
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
} satisfies Meta<typeof PresaleComponent.ServiceDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
  },
};
