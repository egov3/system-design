"use client";

import type { Meta } from "@storybook/react-webpack5";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "StatusText",
  component: BaseComponents.StatusText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BaseComponents.StatusText>;

export default meta;

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...";

export const WithIconLeftAlignError = () => (
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
      <BaseComponents.StatusText
        isNeedIcon={true}
        isAlignedCenter={false}
        text={text}
      />
    </div>
  </CardWrapperItem>
);

export const WithIconLeftAlignSuccess = () => (
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
      <BaseComponents.StatusText
        isNeedIcon={true}
        isAlignedCenter={false}
        text={text}
        variant="SUCCESS"
      />
    </div>
  </CardWrapperItem>
);

export const WithIconLeftAlignInfo = () => (
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
      <BaseComponents.StatusText
        isNeedIcon={true}
        isAlignedCenter={false}
        text={text}
        variant="INFO"
      />
    </div>
  </CardWrapperItem>
);

export const WithoutIconLeftAlign = () => (
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
      <BaseComponents.StatusText
        isNeedIcon={false}
        isAlignedCenter={false}
        text={text}
      />
    </div>
  </CardWrapperItem>
);

export const WithIconCenterAlign = () => (
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
      <BaseComponents.StatusText
        isNeedIcon={true}
        isAlignedCenter={true}
        text={text}
      />
    </div>
  </CardWrapperItem>
);

export const WithoutIconCenterAlign = () => (
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
      <BaseComponents.StatusText
        isNeedIcon={false}
        isAlignedCenter={true}
        text={text}
      />
    </div>
  </CardWrapperItem>
);
