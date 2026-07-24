import { render, screen } from "@testing-library/react";
import { PersonalIDTemplate } from "~components";
import type { IPersonalIDUserData } from "~interfaces/PersonalIDTemplate";

const userData: IPersonalIDUserData = {
  lastName: "ТЕСТОВ",
  firstName: "ТЕСТ",
  middleName: "ТЕСТОВИЧ",
  birthDate: "01.01.2000",
  gender: "ЕР / М",
  IIN: "900512300123",
};

const defaultProps = {
  userPhoto: "user-photo.png",
  userSign: "user-sign.png",
  userData,
};

describe("PersonalIDTemplate", () => {
  it("(1) Should render every user data value", () => {
    render(<PersonalIDTemplate {...defaultProps} />);

    expect(screen.getByTestId("PersonalIDTemplate_LASTNAME_VALUE")).toHaveTextContent(
      userData.lastName,
    );
    expect(
      screen.getByTestId("PersonalIDTemplate_FIRSTNAME_VALUE"),
    ).toHaveTextContent(userData.firstName);
    expect(
      screen.getByTestId("PersonalIDTemplate_MIDDLENAME_VALUE"),
    ).toHaveTextContent(userData.middleName);
    expect(
      screen.getByTestId("PersonalIDTemplate_BIRTHDATE_VALUE"),
    ).toHaveTextContent(userData.birthDate);
    expect(screen.getByTestId("PersonalIDTemplate_GENDER_VALUE")).toHaveTextContent(
      userData.gender,
    );
    expect(screen.getByTestId("PersonalIDTemplate_IIN_VALUE")).toHaveTextContent(
      userData.IIN,
    );
  });

  it("(2) Should render the overlay, field containers and labels", () => {
    render(<PersonalIDTemplate {...defaultProps} />);

    expect(screen.getByTestId("PersonalIDTemplate_OVERLAY")).toBeInTheDocument();

    expect(
      screen.getByTestId("PersonalIDTemplate_LASTNAME_FIELD"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("PersonalIDTemplate_FIRSTNAME_FIELD"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("PersonalIDTemplate_MIDDLENAME_FIELD"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("PersonalIDTemplate_BIRTHDATE_FIELD"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("PersonalIDTemplate_GENDER_FIELD"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("PersonalIDTemplate_IIN_FIELD"),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("PersonalIDTemplate_LASTNAME_LABEL"),
    ).toHaveTextContent("ТЕГІ / ФАМИЛИЯ");
    expect(
      screen.getByTestId("PersonalIDTemplate_FIRSTNAME_LABEL"),
    ).toHaveTextContent("АТЫ / ИМЯ");
    expect(
      screen.getByTestId("PersonalIDTemplate_MIDDLENAME_LABEL"),
    ).toHaveTextContent("ӘКЕСІНІҢ АТЫ / ОТЧЕСТВО");
    expect(
      screen.getByTestId("PersonalIDTemplate_BIRTHDATE_LABEL"),
    ).toHaveTextContent("ТУҒАН КҮНІ / ДАТА РОЖДЕНИЯ");
    expect(
      screen.getByTestId("PersonalIDTemplate_GENDER_LABEL"),
    ).toHaveTextContent("ЖЫНЫСЫ / ПОЛ");
    expect(
      screen.getByTestId("PersonalIDTemplate_IIN_LABEL"),
    ).toHaveTextContent("ЖСН / ИИН");
  });

  it("(3) Should render the user photo and signature with the provided sources", () => {
    render(<PersonalIDTemplate {...defaultProps} />);

    expect(screen.getByTestId("PersonalIDTemplate_PHOTO")).toHaveAttribute(
      "src",
      "user-photo.png",
    );
    expect(screen.getByTestId("PersonalIDTemplate_SIGN")).toHaveAttribute(
      "src",
      "user-sign.png",
    );
  });

  it("(4) Should apply the default width and derive the height when width is a number", () => {
    render(<PersonalIDTemplate {...defaultProps} />);

    expect(screen.getByTestId("PersonalIDTemplate")).toHaveStyle({
      width: "363px",
    });

    const illustration = screen.getByTestId("PersonalIDIllustration");
    expect(illustration).toHaveAttribute("width", "363");
    expect(illustration).toHaveAttribute("height", "231");
  });

  it("(5) Should scale to a custom numeric width while keeping the aspect ratio", () => {
    render(<PersonalIDTemplate {...defaultProps} width={726} />);

    expect(screen.getByTestId("PersonalIDTemplate")).toHaveStyle({
      width: "726px",
    });

    const illustration = screen.getByTestId("PersonalIDIllustration");
    expect(illustration).toHaveAttribute("width", "726");
    expect(illustration).toHaveAttribute("height", "462");
  });

  it("(6) Should accept a non-numeric width without setting an explicit height", () => {
    render(<PersonalIDTemplate {...defaultProps} width="100%" />);

    expect(screen.getByTestId("PersonalIDTemplate")).toHaveStyle({
      width: "100%",
    });
    expect(screen.getByTestId("PersonalIDIllustration")).not.toHaveAttribute(
      "height",
    );
  });
});
