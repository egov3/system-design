import React, { Dispatch, SetStateAction, useState } from "react";

import { Meta } from "@storybook/react";
import { Components } from "~components";
import { ISelectedPeriod, IStrictSelectedPeriod } from "~interfaces/Calendar";
import { formatDate } from "~utils/date/formatDate";
import { inverseDate } from "~utils/date/inverseDate";

const meta: Meta<typeof Components.Calendar> = {
  title: "Calendar",
  component: Components.Calendar.Main as unknown as React.FC,
  argTypes: {},
};

export default meta;

export const CalendarStory = () => {
  const [selectedRadioOption, setSelectedRadioOption] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
    periodSelected: true,
    fromDate: "2025-02-02",
    toDate: "2025-02-02",
  });

  const monthsBefore = {
    6: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    12: new Date(new Date().setMonth(new Date().getMonth() - 12)),
  };

  const predefinedPeriods = [
    {
      label: "6 месяцев",
      value: formatDate(monthsBefore[6]),
    },
    {
      label: "12 месяцев",
      value: formatDate(monthsBefore[12]),
    },
    {
      label: "Весь период",
      value: "fullPeriod",
    },
  ];
  return (
    <div
      data-testid="R601Steps_WRAP"
      style={{
        padding: "16px",
        borderBottom: "1px solid #f0f2f4",
        height: "60vh",
      }}
    >
      <div
        data-testid="R601Steps_PERIOD"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Components.RadioGroup
          setSelectedOption={setSelectedRadioOption}
          selectedOption={selectedRadioOption}
          invokeCustomOnChange={(e) => {
            if (e.target.value === "fullPeriod") {
              setSelectedPeriod({
                periodSelected: false,
              });
            } else {
              setSelectedPeriod({
                fromDate: e.target.value,
                toDate: formatDate(new Date()),
                periodSelected: true,
              });
            }
          }}
          RadioGroupItems={predefinedPeriods}
        />
        <Components.SelectBoxButton
          modalValue={
            selectedPeriod.periodSelected &&
            selectedPeriod.fromDate &&
            selectedPeriod.toDate
              ? [
                  inverseDate(selectedPeriod.fromDate),
                  inverseDate(selectedPeriod.toDate),
                ].join("-")
              : undefined
          }
          labelText="Выбрать период по датам"
          setIsOpen={setIsModalOpen}
          disabled={false}
        />
        <Components.Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          headerTitle="Выберите период отчисления"
          variant="small"
        >
          <Components.Calendar.Main
            selectedPeriod={selectedPeriod as IStrictSelectedPeriod}
            setSelectedPeriod={
              setSelectedPeriod as Dispatch<
                SetStateAction<IStrictSelectedPeriod>
              >
            }
            setIsModalOpen={setIsModalOpen}
            setSelectedRadioOption={setSelectedRadioOption}
          />
        </Components.Modal>
      </div>
    </div>
  );
};
