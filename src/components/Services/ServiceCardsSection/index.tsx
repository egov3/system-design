import { ChevronRightSmallIcon } from "@egov3/graphics/Basic/ChevronRightSmall";

import type { IServiceCardComponentProps } from "~interfaces/ServiceCardComponent";

import { joinClasses } from "~utils/joinClasses";

import { Label } from "../../../baseComponents/Label";
import { ServiceCardComponent } from "../ServiceCardComponent";
import styles from "./ServiceCardsSection.module.css";

export interface IServiceCardsSectionCard extends Pick<
  IServiceCardComponentProps,
  "badge" | "title"
> {
  id: string;
  onClick: () => void;
}

export interface IServiceCardsSectionProps {
  title: string;
  cards: IServiceCardsSectionCard[];
  onTitleClick?: () => void;
  isFourColumns?: boolean;
}

export const ServiceCardsSection = ({
  title,
  cards,
  onTitleClick,
  isFourColumns = false,
}: IServiceCardsSectionProps) => (
  <section
    aria-label={title}
    className={styles.section}
    data-testid="ServiceCardsSection_WRAPPER"
  >
    {onTitleClick ? (
      <button
        aria-label={title}
        className={styles.titleButton}
        data-testid="ServiceCardsSection_TITLE_BTN"
        onClick={onTitleClick}
        type="button"
      >
        <Label isSpaced={false} text={title} variant="big" />
        <ChevronRightSmallIcon data-testid="ServiceCardsSection_TITLE_ICON" />
      </button>
    ) : (
      <Label isSpaced={false} text={title} variant="big" />
    )}
    <div
      className={joinClasses(styles.grid, isFourColumns && styles.fourColumns)}
      data-testid="ServiceCardsSection_GRID"
    >
      {cards.map((card) => (
        <ServiceCardComponent
          badge={card.badge}
          handleOrderService={card.onClick}
          isNew={false}
          key={card.id}
          title={card.title}
        />
      ))}
    </div>
  </section>
);
