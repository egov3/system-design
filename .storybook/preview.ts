// .storybook/preview.ts

import "~styles/global.css";
import "~styles/normalize.css";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const tags = ["autodocs"];
