import { Icons } from "@egov3/graphics";
import { joinClasses } from "~utils/joinClasses";
import styles from "./ViewToggle.module.css";

export interface IViewToggleProps {
  activeView: "serviceCardList" | "serviceCardGrid";
  setActiveView: (view: string) => void;
}

export const ViewToggle = ({ activeView, setActiveView }: IViewToggleProps) => {
  const viewOptions = [
    { type: "serviceCardList", Icon: Icons.General.ViewList },
    { type: "serviceCardGrid", Icon: Icons.General.ViewGrid },
  ];

  return (
    <div data-testid="NavigationComponent_VIEW" className={styles.view}>
      {viewOptions.map(({ type, Icon }) => (
        <button
          key={type}
          type="button"
          data-testid="ViewToggleBtn_BTN"
          onClick={() => {
            setActiveView(type);
          }}
        >
          <Icon
            data-testid={`${type}_ICON`}
            className={joinClasses(
              styles.icon,
              activeView === type ? styles.selected : styles.unselected,
            )}
          />
        </button>
      ))}
    </div>
  );
};
