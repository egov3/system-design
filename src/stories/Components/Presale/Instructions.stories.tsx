import { PresaleComponent } from "../../../components/Presale";
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
      <PresaleComponent.Instructions serviceId="P601" lang="ru" />
    </div>
  </CardWrapperItem>
);

export const Instructions = () => <InstructionsStory />;

export default {
  title: "Components/Presale/Instructions",
  component: InstructionsStory,
};
