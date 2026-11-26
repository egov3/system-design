import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { SelectRequestTypeUI } from "src/components/Services/SelectRequestType/SelectRequestType";
import { IRequestTypeOption } from "~interfaces/SelectRequestTypeUI";

const requestTypeOptions: IRequestTypeOption[] = [
  {
    label: "На себя",
    value: "self",
  },
  {
    label: "На ИИН или БИН организации",
    value: "thirdParty",
  },
];

const SelectRequestTypeUIStory = () => {
  const [pendingRequestType, setPendingRequestType] = useState<string | null>(
    null,
  );
  const [selectedRequestType, setSelectedRequestType] = useState<string | null>(
    null,
  );

  const selectedLabel = requestTypeOptions.find(
    (option) => option.value === selectedRequestType,
  )?.label;

  const handleClickSelectBox = () => {
    setPendingRequestType(selectedRequestType);
  };

  const handleSelect = () => {
    setSelectedRequestType(pendingRequestType);
  };

  return (
    <SelectRequestTypeUI
      lang="ru"
      isDisabledModalSelectBtn={
        !pendingRequestType || pendingRequestType === selectedRequestType
      }
      selectedLabel={selectedLabel}
      pendingRequestType={pendingRequestType}
      requestTypeOptions={requestTypeOptions}
      handleClickSelectBox={handleClickSelectBox}
      onRequestTypeSelect={handleSelect}
      onRequestTypeChange={setPendingRequestType}
    />
  );
};

const meta: Meta<typeof SelectRequestTypeUI> = {
  title: "Components/Services/SelectRequestTypeUI",
  component: SelectRequestTypeUI,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SelectRequestTypeUI>;

export const Default: Story = {
  render: () => <SelectRequestTypeUIStory />,
};
