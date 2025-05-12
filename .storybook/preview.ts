// .storybook/preview.ts

import '../src/styles/global.css';
import '../src/styles/normalize.css';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const tags = ["autodocs"];
