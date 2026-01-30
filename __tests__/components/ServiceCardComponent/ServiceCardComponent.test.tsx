// ServiceCardComponent.test.tsx
import { Icons } from "@egov3/graphics";

import { render, screen } from "@testing-library/react";
import { Components } from "~components";

const badge = {
  category: {
    icon: <Icons.General.City />,
    name: {
      ru: "",
      kk: "",
      en: "",
    },
  },
  subcategory: {
    icon: <Icons.General.RealEstate />,
    name: {
      ru: "",
      kk: "",
      en: "",
    },
  },
};
describe("ServiceCardComponent", () => {
  it("(1) Should render for service P601", () => {
    render(
      <Components.ServiceCardComponent
        serviceId="P601"
        handleOrderService={() => {}}
        badge={badge}
        lang="en"
      />,
    );

    expect(
      screen.getByText("Pension contributions statement"),
    ).toBeInTheDocument();
  });

  it("(2) Should render tag NEW if isNew=true and category provided", () => {
    render(
      <Components.ServiceCardComponent
        serviceId="P2203"
        handleOrderService={() => {}}
        badge={badge}
        lang="ru"
      />,
    );
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });
});
