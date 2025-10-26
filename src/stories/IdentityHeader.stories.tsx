"use client";

import type { Meta } from "@storybook/react-webpack5";
import { Components } from "~components";
import type { IRouterClosure } from "~interfaces/common";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "IdentityModal",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

const goBackService = () => {
  console.log("goBackService");
};
export const IdentityModalPrimary = () => {
  const navigator = (props: IRouterClosure) => () => {
    console.log("IdentityModalPrimary props", props);
  };
  return (
    <CardWrapperItem>
      <Components.IdentityModal
        goBackService={goBackService}
        isMain={true}
        navigator={navigator}
        lang="ru"
      >
        content
      </Components.IdentityModal>
    </CardWrapperItem>
  );
};

export const IdentityModalSecondary = () => {
  const navigator = (props: IRouterClosure) => () => {
    console.log("IdentityModalPrimary props", props);
  };
  return (
    <CardWrapperItem>
      <Components.IdentityModal
        goBackService={goBackService}
        isMain={false}
        navigator={navigator}
        lang="ru"
      >
        content
      </Components.IdentityModal>
    </CardWrapperItem>
  );
};
