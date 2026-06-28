"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { IdentityModal } from "~components";
import type { ILangGeneric } from "~interfaces/common";
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
const handleLogoClick = () => {
  console.log("IdentityModal handleLogoClick");
};

export const IdentityModalSb = () => (
  <CardWrapperItem>
    <IdentityModal
      goBackService={goBackService}
      handleLogoClick={handleLogoClick}
      lang="ru"
    >
      content
    </IdentityModal>
  </CardWrapperItem>
);

export const IdentityModalWithFooter = () => {
  const [lang, setLang] = useState<keyof ILangGeneric<string>>("ru");

  return (
    <CardWrapperItem>
      <IdentityModal
        goBackService={goBackService}
        handleLogoClick={handleLogoClick}
        lang={lang}
        handleLangChange={(tmpLang) => {
          setLang(tmpLang as keyof ILangGeneric<string>);
        }}
      >
        content
      </IdentityModal>
    </CardWrapperItem>
  );
};
