import { Components } from "~components";
import { i18n } from "~constants/i18n";
import { CardWrapperItem } from "../../CardWrapperItem";

const InstructionsStory = () => (
  <CardWrapperItem>
    <div
      style={{
        padding: "10px",
        background: "#fff",
        borderRadius: "12px",
      }}
    >
      <Components.PresaleComponent.Instructions
        instructions={i18n.Services.presaleMock.instructions.P601}
        lang="ru"
      />
    </div>
  </CardWrapperItem>
);

export const Instructions = () => <InstructionsStory />;

export default {
  title: "Components/Presale/Instructions",
  component: InstructionsStory,
};
