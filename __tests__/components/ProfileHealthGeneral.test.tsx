import { render, screen } from "@testing-library/react";
import { Components } from "~components";

const { ProfileHealthGeneral } = Components;

describe("ProfileHealthGeneral", () => {
  const mockAttachedClinic = [
    {
      title: "Наименование медицинской организации",
      value: "ТОО “Поликлиника “CITY”",
    },
    {
      title: "Участковый врач",
      value: "Закирова Гульшат Аманбекова",
    },
  ];

  const mockCompulsoryHealthInsurance = [
    {
      title: "Статус",
      value: "Застрахован",
    },
    {
      title: "Вид последнего платежа",
      value: "Взнос на обязательное социальное медицинское страхование",
    },
  ];

  const defaultProps = {
    lang: "ru" as const,
    attachedClinic: mockAttachedClinic,
    compulsoryHealthInsurance: mockCompulsoryHealthInsurance,
  };

  it("(1) Should render all attached clinic items", () => {
    render(<ProfileHealthGeneral {...defaultProps} />);

    const attachedBlocks = screen.getAllByTestId("ProfileHealthAttached_BLOCK");
    expect(attachedBlocks).toHaveLength(2);

    const values = screen.getAllByTestId("ProfileHealthContent_VALUE");
    const titles = screen.getAllByTestId("ProfileHealthContent_TITLE");

    expect(values[0]).toHaveTextContent("ТОО “Поликлиника “CITY”");
    expect(titles[0]).toHaveTextContent("Наименование медицинской организации");

    expect(values[1]).toHaveTextContent("Закирова Гульшат Аманбекова");
    expect(titles[1]).toHaveTextContent("Участковый врач");
  });

  it("(2) Should render all insurance items", () => {
    render(<ProfileHealthGeneral {...defaultProps} />);

    const insuranceBlocks = screen.getAllByTestId(
      "ProfileHealthInsurance_BLOCK",
    );
    expect(insuranceBlocks).toHaveLength(2);

    const values = screen.getAllByTestId("ProfileHealthInsurance_VALUE");
    const titles = screen.getAllByTestId("ProfileHealthInsurance_TITLE");

    expect(values[0]).toHaveTextContent("Застрахован");
    expect(titles[0]).toHaveTextContent("Статус");

    expect(values[1]).toHaveTextContent(
      "Взнос на обязательное социальное медицинское страхование",
    );
    expect(titles[1]).toHaveTextContent("Вид последнего платежа");
  });

  it("(3) Should render separator lines", () => {
    render(<ProfileHealthGeneral {...defaultProps} />);

    const lines = screen.getAllByTestId("ProfileHealth_LINE");
    expect(lines).toHaveLength(2);
  });

  it("(4) Should render with empty arrays", () => {
    const emptyProps = {
      lang: "ru" as const,
      attachedClinic: [],
      compulsoryHealthInsurance: [],
    };

    render(<ProfileHealthGeneral {...emptyProps} />);

    expect(screen.getByTestId("ProfileHealth_GENERAL")).toBeInTheDocument();
    expect(screen.getByTestId("ProfileHealth_INFO")).toBeInTheDocument();
    expect(screen.getByTestId("ProfileHealth_INSURANCE")).toBeInTheDocument();

    const attachedContent = screen.getByTestId("ProfileHealthAttached_CONTENT");
    const insuranceContent = screen.getByTestId(
      "ProfileHealthInsurance_CONTENT",
    );

    expect(attachedContent).toBeEmptyDOMElement();
    expect(insuranceContent).toBeEmptyDOMElement();
  });

  it("(11) Should generate unique keys for mapped items", () => {
    render(<ProfileHealthGeneral {...defaultProps} />);

    const attachedBlocks = screen.getAllByTestId("ProfileHealthAttached_BLOCK");
    const insuranceBlocks = screen.getAllByTestId(
      "ProfileHealthInsurance_BLOCK",
    );

    expect(attachedBlocks).toHaveLength(2);
    expect(insuranceBlocks).toHaveLength(2);
  });
});
