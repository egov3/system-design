import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { HtmlContainer } from "~baseComponents";
import { htmlSample } from "~constants/mockData";

import { CardWrapperItem } from "../CardWrapperItem";

interface IHtmlContainerProps {
  html: string;
}

const HtmlContainerComponent = ({ html }: IHtmlContainerProps) => {
  return (
    <CardWrapperItem>
      <div
        style={{
          padding: "10px",
          background: "#fff",
          borderRadius: "12px",
          width: "850px",
        }}
      >
        <HtmlContainer html={html} />
      </div>
    </CardWrapperItem>
  );
};

const meta = {
  title: "BaseComponents/HtmlContainer",
  component: HtmlContainerComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HtmlContainerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    html: htmlSample,
  },
};
