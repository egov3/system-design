"use client";

import type { Meta } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "WarningText",
  component: BaseComponents.WarningText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.WarningText>;

export default meta;

const errorText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...";

export const WithIconLeftAlign = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          height: "200px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.WarningText
          isNeedIcon={true}
          centerAlign={false}
          errorText={errorText}
        />
      </div>
    </CardWrapperItem>
  );
};

export const WithoutIconLeftAlign = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          height: "200px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.WarningText
          isNeedIcon={false}
          centerAlign={false}
          errorText={errorText}
        />
      </div>
    </CardWrapperItem>
  );
};

export const WithIconCenterAlign = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          height: "200px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.WarningText
          isNeedIcon={true}
          centerAlign={true}
          errorText={errorText}
        />
      </div>
    </CardWrapperItem>
  );
};
export const WithoutIconCenterAlign = () => {
  return (
    <CardWrapperItem>
      <div
        style={{
          height: "200px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.WarningText
          isNeedIcon={false}
          centerAlign={true}
          errorText={errorText}
        />
      </div>
    </CardWrapperItem>
  );
};
