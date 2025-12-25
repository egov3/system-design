import { Graphics } from "@egov3/graphics";
import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";

const { DocCard } = Components;

describe("DocCard", () => {
  it("(1) Should render component with default props", () => {
    render(
      <DocCard
        title="Удостоверение личности"
        docIcon={<Graphics.Wallet.PersonalID />}
        lang="ru"
        handleDownload={() => {}}
      />,
    );

    expect(screen.getByTestId("DocCard_TITLE")).toHaveTextContent(
      "Удостоверение личности",
    );

    expect(screen.getByTestId("DocCard_DOCUMENT")).toBeInTheDocument();

    expect(screen.queryByTestId("DocCard_EXPIRATION")).toBeNull();
  });

  it("(2) Should render component with expiration date", () => {
    render(
      <DocCard
        title="Удостоверение личности"
        expiration="До октября 2024"
        docIcon={<Graphics.Wallet.PersonalID />}
        lang="ru"
        handleDownload={() => {}}
      />,
    );

    expect(screen.getByTestId("DocCard_EXPIRATION")).toHaveTextContent(
      "До октября 2024",
    );
  });

  it("(3) Should toggle modal on button click", () => {
    render(
      <DocCard
        title="Удостоверение личности"
        docIcon={<Graphics.Wallet.PersonalID />}
        lang="ru"
        handleDownload={() => {}}
      />,
    );

    const button = screen.getByTestId("DocCard_BUTTON");
    expect(button).toBeInTheDocument();

    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId("Modal_WRAPPER")).toBeInTheDocument();

    const closeButton = screen.getByTestId("ModalHeaderBtn_CLOSE");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();
  });

  it("(4) Should toggle modal and check modal content", () => {
    render(
      <DocCard
        title="Удостоверение личности"
        docIcon={<Graphics.Wallet.PersonalID />}
        lang="ru"
        handleDownload={() => {}}
      >
        <p>Документ доступен только в еGov</p>
      </DocCard>,
    );

    const button = screen.getByTestId("DocCard_BUTTON");
    expect(button).toBeInTheDocument();

    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId("Modal_WRAPPER")).toBeInTheDocument();

    expect(
      screen.getByText(/Документ доступен только в еGov/i),
    ).toBeInTheDocument();

    const closeButton = screen.getByTestId("ModalHeaderBtn_CLOSE");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("Modal_WRAPPER")).not.toBeInTheDocument();
  });
});
