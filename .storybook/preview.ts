// .storybook/preview.ts

import '../src/styles/global.scss';
import '../src/styles/normalize.scss';
import '../src/styles/colors.scss';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const tags = ["autodocs"];
