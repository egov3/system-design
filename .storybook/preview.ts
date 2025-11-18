// .storybook/preview.ts
import React from "react";
import "../src/styles/global.css";
import "../src/styles/normalize.css";
import "../src/styles/animations.css";

window.React = React;

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const tags = ["autodocs"];
