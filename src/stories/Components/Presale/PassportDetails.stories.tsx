import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";
import { i18n } from "~constants/i18n";
import { passportDetails } from "~constants/mockData";
import type { IPassportDetailsItem } from "../../../components/Presale/PassportDetails";
import { CardWrapperItem } from "../../CardWrapperItem";

interface IPassportModalTemplateProps {
  details: IPassportDetailsItem[];
}
const meta: Meta<typeof Components.PresaleComponent.PassportDetails> = {
  title: "Components/Presale/PassportDetails",
  component: Components.PresaleComponent.PassportDetails,
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: "600px", height: "500px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Components.PresaleComponent.PassportDetails>;

const PassportModalTemplate = ({ details }: IPassportModalTemplateProps) => (
  <BaseComponents.Modal
    open={true}
    setOpen={() => {}}
    header={{
      title: i18n.Common.passportBtnText.ru,
      isClosable: true,
    }}
    lang="ru"
    variant="small"
  >
    <Components.PresaleComponent.PassportDetails details={details} lang="ru" />
  </BaseComponents.Modal>
);

export const Default: Story = {
  render: () => <PassportModalTemplate details={passportDetails} />,
};

export const Empty: Story = {
  render: () => <PassportModalTemplate details={[]} />,
};
