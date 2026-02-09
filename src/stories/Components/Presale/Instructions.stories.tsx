import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "~components";
import { steps } from "~constants/mockData";
import type { ILangProps } from "~interfaces/common";
import { CardWrapperItem } from "../../CardWrapperItem";

const InstructionsStory = ({ lang }: ILangProps) => (
  <CardWrapperItem>
    <div
      style={{
        padding: "10px",
        background: "#fff",
        borderRadius: "12px",
      }}
    >
      <Components.PresaleComponent.Instructions
        instructions={steps}
        lang={lang}
      />
    </div>
  </CardWrapperItem>
);

const meta: Meta<typeof InstructionsStory> = {
  title: "Components/Presale/Instructions",
  component: InstructionsStory,
  argTypes: {
    lang: {
      control: { type: "radio" },
      options: ["ru", "kk", "en"],
    },
  },
  args: {
    lang: "ru",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
