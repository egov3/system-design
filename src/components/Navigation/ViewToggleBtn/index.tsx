export interface IViewToggleBtnProps {
  viewType: string;
  activeView: string;
  setActiveView: (view: string) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const ViewToggleBtn = ({
  viewType,
  activeView,
  setActiveView,
  Icon,
}: IViewToggleBtnProps) => (
  <button
    type="button"
    data-testid="ViewToggleBtn_BTN"
    onClick={() => setActiveView(viewType)}
  >
    <Icon
      fill={
        activeView === viewType
          ? "var(--icon-primary-color)"
          : "var(--icon-secondary-color)"
      }
      width="20px"
      height="20px"
      data-testid={`${viewType}_ICON`}
    />
  </button>
);
