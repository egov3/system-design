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
  it("(1) Should render the user photo and signature with the provided sources", () => {
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

  it("(2) Should render every user data value", () => {
    render(<PersonalIDTemplate {...defaultProps} />);

    expect(
      screen.getByTestId("PersonalIDTemplate_LASTNAME_VALUE"),
    ).toHaveTextContent(userData.lastName);
    expect(
      screen.getByTestId("PersonalIDTemplate_FIRSTNAME_VALUE"),
    ).toHaveTextContent(userData.firstName);
    expect(
      screen.getByTestId("PersonalIDTemplate_MIDDLENAME_VALUE"),
    ).toHaveTextContent(userData.middleName);
    expect(
      screen.getByTestId("PersonalIDTemplate_BIRTHDATE_VALUE"),
    ).toHaveTextContent(userData.birthDate);
    expect(
      screen.getByTestId("PersonalIDTemplate_GENDER_VALUE"),
    ).toHaveTextContent(userData.gender);
    expect(
      screen.getByTestId("PersonalIDTemplate_IIN_VALUE"),
    ).toHaveTextContent(userData.IIN);
  });
});
