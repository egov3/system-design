import { CityIcon } from "@egov3/graphics/General/City";
import { HelpCenterArticleIcon } from "@egov3/graphics/General/HelpCenterArticle";

import type { IServiceCardsSectionCard } from "~components";

const badge = {
  category: { icon: <CityIcon /> },
  subcategory: { icon: <HelpCenterArticleIcon /> },
};

export const serviceCardsSectionItems: IServiceCardsSectionCard[] = [
  {
    id: "article-1",
    title: "Как зарегистрировать ИП",
    badge,
    onClick: () => {},
  },
  { id: "article-2", title: "Как получить справку", badge, onClick: () => {} },
];
