"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";
import type { ILangGeneric, IRouterClosure } from "~interfaces/common";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Identity/IdentityModal",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

const goBackService = () => {
  console.log("goBackService");
};
export const IdentityModal = () => {
  const navigator = (props: IRouterClosure) => () => {
    console.log("IdentityModalPrimary props", props);
  };
  return (
    <CardWrapperItem>
      <Components.IdentityModal
        goBackService={goBackService}
        navigator={navigator}
        lang="ru"
      >
        content
      </Components.IdentityModal>
    </CardWrapperItem>
  );
};

export const IdentityModalWithFooter = () => {
  const [lang, setLang] = useState<keyof ILangGeneric<string>>("ru");
  const navigator = (props: IRouterClosure) => () => {
    console.log("IdentityModalPrimary props", props);
  };

  return (
    <CardWrapperItem>
      <Components.IdentityModal
        goBackService={goBackService}
        navigator={navigator}
        lang={lang}
        handleLangChange={(tmpLang) => {
          setLang(tmpLang as keyof ILangGeneric<string>);
        }}
      >
        content
      </Components.IdentityModal>
    </CardWrapperItem>
  );
};
