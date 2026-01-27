import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import type { ISearchBarProps } from "../../baseComponents/SearchBar";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/SearchBar",
  component: BaseComponents.SearchBar,
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
} satisfies Meta<typeof BaseComponents.SearchBar>;

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
      <BaseComponents.Typography
        tag="span"
        fontClass="body1Regular"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        Результат по Enter:<strong>{searchValue || "(пусто)"}</strong>
      </BaseComponents.Typography>
      <BaseComponents.SearchBar lang={"ru"} handleOnEnter={handleOnEnter} />
    </div>
  );
};

export const InteractiveOnEnter: Story = {
  render: InteractiveOnEnterStory,
};

const InteractiveOnChangeStory = (props: ISearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <BaseComponents.Typography
        tag="span"
        fontClass="body1Regular"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        Результат onChange: <strong>{searchValue || "(пусто)"}</strong>
      </BaseComponents.Typography>
      <BaseComponents.SearchBar {...props} handleOnChange={setSearchValue} />
    </div>
  );
};

export const InteractiveOnChange: Story = {
  args: {
    lang: "ru",
    variant: "default",
    debounceDelay: 300,
  },
  render: (args) => {
    const props = args as ISearchBarProps;
    return <InteractiveOnChangeStory {...props} />;
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    lang: "ru",
    variant: "default",
    placeholder: "Введите текст для поиска...",
  },
};
