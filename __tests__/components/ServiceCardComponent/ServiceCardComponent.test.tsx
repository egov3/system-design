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

describe("ServiceCardComponent", () => {
  it("(1) Should render the ServiceCardComponent with the correct title", () => {
    render(
      <ServiceCardComponent
        isNew={false}
        handleOrderService={() => {}}
        badge={badge}
        title="Заголовок карточки"
      />,
    );

    expect(screen.getByText("Заголовок карточки")).toBeInTheDocument();
  });

  it("(2) Should render tag NEW if isNew=true and category provided", () => {
    render(
      <ServiceCardComponent
        isNew={true}
        handleOrderService={() => {}}
        badge={badge}
        title="Заголовок карточки"
      />,
    );
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("(3) Should apply the mobile variant class when variant='mobile'", () => {
    render(
      <ServiceCardComponent
        isNew={false}
        handleOrderService={() => {}}
        badge={badge}
        title="Заголовок карточки"
        variant="mobile"
      />,
    );

    expect(screen.getByTestId("ServiceCardComponent_BUTTON").className).toMatch(
      /\bmobile\b/,
    );
  });
});
