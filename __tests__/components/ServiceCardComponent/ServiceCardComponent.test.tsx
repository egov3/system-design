import { CityIcon } from "@egov3/graphics/General/City";
import { RealEstateIcon } from "@egov3/graphics/General/RealEstate";
import { render, screen } from "@testing-library/react";
import { ServiceCardComponent } from "~components";

const badge = {
  category: {
    icon: <CityIcon />,
  },
  subcategory: {
    icon: <RealEstateIcon />,
  },
};

const defaultProps = {
  isNew: false,
  handleOrderService: () => {},
  badge,
  title: "Заголовок карточки",
};

describe("ServiceCardComponent", () => {
  it("(1) Should render the ServiceCardComponent with the correct title", () => {
    render(<ServiceCardComponent {...defaultProps} />);

    expect(screen.getByText("Заголовок карточки")).toBeInTheDocument();
  });

  it("(2) Should render tag NEW if isNew=true and hide category icon", () => {
    render(<ServiceCardComponent {...defaultProps} isNew />);

    expect(screen.getByTestId("ServiceCardComponent_NEW")).toBeInTheDocument();
    expect(screen.getByText("NEW")).toBeInTheDocument();
    expect(
      screen.queryByTestId("ServiceCardComponent_CATEGORY"),
    ).not.toBeInTheDocument();
  });

  it("(3) Should apply the mobile variant class when variant='mobile'", () => {
    render(<ServiceCardComponent {...defaultProps} variant="mobile" />);

    expect(screen.getByTestId("ServiceCardComponent_BUTTON").className).toMatch(
      /\bmobile\b/,
    );
    expect(screen.getByTestId("ServiceCardComponent_WRAPPER").className).toMatch(
      /\bmobile\b/,
    );
  });

  it("(4) Should apply the horizontal class when direction='horizontal'", () => {
    render(<ServiceCardComponent {...defaultProps} direction="horizontal" />);

    expect(screen.getByTestId("ServiceCardComponent_BUTTON").className).toMatch(
      /\bhorizontal\b/,
    );
    expect(screen.getByTestId("ServiceCardComponent_LABEL").className).toMatch(
      /\bhorizontal\b/,
    );
  });

  it("(5) Should not apply the horizontal class when direction='vertical'", () => {
    render(<ServiceCardComponent {...defaultProps} direction="vertical" />);

    expect(
      screen.getByTestId("ServiceCardComponent_BUTTON").className,
    ).not.toMatch(/\bhorizontal\b/);
    expect(
      screen.getByTestId("ServiceCardComponent_LABEL").className,
    ).not.toMatch(/\bhorizontal\b/);
  });

  it("(6) Should apply the horizontal class by default", () => {
    render(<ServiceCardComponent {...defaultProps} />);

    expect(screen.getByTestId("ServiceCardComponent_BUTTON").className).toMatch(
      /\bhorizontal\b/,
    );
    expect(screen.getByTestId("ServiceCardComponent_LABEL").className).toMatch(
      /\bhorizontal\b/,
    );
  });

  it("(7) Should render category icon when isNew=false and category is provided", () => {
    render(<ServiceCardComponent {...defaultProps} />);

    expect(
      screen.getByTestId("ServiceCardComponent_CATEGORY"),
    ).toBeInTheDocument();
  });

  it("(8) Should not render category icon when category is omitted", () => {
    render(
      <ServiceCardComponent
        {...defaultProps}
        badge={{ subcategory: badge.subcategory }}
      />,
    );

    expect(
      screen.queryByTestId("ServiceCardComponent_CATEGORY"),
    ).not.toBeInTheDocument();
  });

  it("(9) Should render without subcategory icon", () => {
    render(
      <ServiceCardComponent
        {...defaultProps}
        badge={{ category: badge.category }}
      />,
    );

    expect(
      screen.getByTestId("ServiceCardComponent_WRAPPER"),
    ).toBeInTheDocument();
    expect(screen.getByText("Заголовок карточки")).toBeInTheDocument();
  });
});
