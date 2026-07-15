import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { SearchBar, Typography } from "~baseComponents";
import type { ISearchBarProps } from "../../baseComponents/SearchBar";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "shadow", "slim"],
    },
    lang: {
      control: "select",
      options: ["ru", "kk", "en"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    showClearButton: { control: "boolean" },
    debounceDelay: { control: "number" },
  },
  args: {
    lang: "ru",
    variant: "default",
    loading: false,
    disabled: false,
    showClearButton: true,
    debounceDelay: 300,
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
    variant: "default",
  },
};

export const ShadowVariant: Story = {
  args: {
    lang: "ru",
    variant: "shadow",
  },
};

export const SlimVariant: Story = {
  args: {
    lang: "ru",
    variant: "slim",
  },
};

export const WithDefaultValue: Story = {
  args: {
    lang: "ru",
    variant: "default",
    defaultValue: "Пример поиска",
  },
};

export const Loading: Story = {
  args: {
    lang: "ru",
    variant: "default",
    loading: true,
    defaultValue: "Загрузка...",
  },
};

export const Disabled: Story = {
  args: {
    lang: "ru",
    variant: "default",
    disabled: true,
    defaultValue: "Отключено",
  },
};

export const WithoutClearButton: Story = {
  args: {
    lang: "ru",
    variant: "default",
    showClearButton: false,
    defaultValue: "Без кнопки очистки",
  },
};

const InteractiveOnEnterStory = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleOnEnter = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Typography
        tag="span"
        fontClass="body1Regular"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        Результат по Enter:<strong>{searchValue || "(пусто)"}</strong>
      </Typography>
      <SearchBar lang={"ru"} handleOnEnter={handleOnEnter} />
    </div>
  );
};

export const InteractiveOnEnter: Story = {
  render: InteractiveOnEnterStory,
};

const InteractiveOnChangeStoryWithFormatter = (props: ISearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const formatter = (val: string): string => {
    const onlyDigits = val.replace(/\D/g, "");
    return onlyDigits.slice(0, 12);
  };

  return (
    <div>
      <Typography
        tag="span"
        fontClass="body1Regular"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        Результат onChange: <strong>{searchValue || "(пусто)"}</strong>
      </Typography>
      <SearchBar
        {...props}
        handleOnChange={setSearchValue}
        formatter={formatter}
        defaultValue={searchValue}
      />
    </div>
  );
};

export const InteractiveOnChangeWithFormatter: Story = {
  args: {
    lang: "ru",
    variant: "default",
    debounceDelay: 300,
  },
  render: (args) => {
    const props = args as ISearchBarProps;
    return <InteractiveOnChangeStoryWithFormatter {...props} />;
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    lang: "ru",
    variant: "default",
    placeholder: "Введите текст для поиска...",
  },
};
