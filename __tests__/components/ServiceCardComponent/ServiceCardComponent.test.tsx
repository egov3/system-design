import { CityIcon } from "@egov3/graphics/General/City";
import { RealEstateIcon } from "@egov3/graphics/General/RealEstate";
import { render, screen } from "@testing-library/react";
import { Components } from "~components";

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
      <Components.ServiceCardComponent
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
      <Components.ServiceCardComponent
        isNew={true}
        handleOrderService={() => {}}
        badge={badge}
        title="Заголовок карточки"
      />,
    );
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });
});
