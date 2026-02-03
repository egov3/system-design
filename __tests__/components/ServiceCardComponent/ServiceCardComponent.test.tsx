import { Icons } from "@egov3/graphics";
import { render, screen } from "@testing-library/react";
import { Components } from "~components";

const badge = {
  category: {
    icon: <Icons.General.City />,
  },
  subcategory: {
    icon: <Icons.General.RealEstate />,
  },
};
describe("ServiceCardComponent", () => {
  it("(1) Should render for service P601", () => {
    render(
      <Components.ServiceCardComponent
        serviceDetails={{
          categoryName: "socialWelfare.pension",
          id: 1,
          isNew: false,
          isPopular: true,
          link: "/services/presale/P601",
        }}
        handleOrderService={() => {}}
        badge={badge}
        title="Справка о пенсионных отчислениях"
      />,
    );

    expect(
      screen.getByText("Справка о пенсионных отчислениях"),
    ).toBeInTheDocument();
  });

  it("(2) Should render tag NEW if isNew=true and category provided", () => {
    render(
      <Components.ServiceCardComponent
        serviceDetails={{
          categoryName: "socialWelfare.pension",
          id: 1,
          isNew: true,
          isPopular: true,
          link: "/services/presale/P601",
        }}
        handleOrderService={() => {}}
        badge={badge}
        title="Справка о пенсионных отчислениях"
      />,
    );
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });
});
