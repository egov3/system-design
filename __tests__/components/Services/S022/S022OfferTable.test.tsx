import { render, screen } from "@testing-library/react";

import { S022OfferTable } from "~components";
import { i18n } from "~constants/i18n";
import { S022_OFFER_TABLE_VACANCIES } from "~constants/mock/S022/S022OfferTable";

const langDic = i18n.S022OfferTable;

const getHeadTexts = () =>
  screen.getAllByRole("columnheader").map((cell) => cell.textContent);

describe("S022OfferTable", () => {
  it("(1) Should render the vacancy columns and a row per vacancy", () => {
    render(<S022OfferTable lang="kk" vacancies={S022_OFFER_TABLE_VACANCIES} />);

    expect(getHeadTexts()).toEqual([
      langDic.organization.kk,
      langDic.salary.kk,
      langDic.educationLevel.kk,
      langDic.workConditions.kk,
    ]);
    expect(screen.getAllByRole("row")).toHaveLength(
      S022_OFFER_TABLE_VACANCIES.length + 1,
    );
  });
});
